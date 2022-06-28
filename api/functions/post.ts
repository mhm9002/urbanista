import { PrismaClient, Term } from '@prisma/client';
import { Request } from 'express';
import { readFileSync, writeFile } from 'fs';
import { missingReq, responseCodes } from './readyResponse';
import natural from 'natural';

const prisma = new PrismaClient();

const getpost = async (req: Request) => {
	let { id, fullPost, userId, details } = req.body;

	let include = details
		? {
				author: true,
				category: true,
				keywords: true,
				likes: true,
				comments: {
					include: {
						commenter: true,
						Children: {
							include: { commenter: true },
						},
					},
				},
		  }
		: { keywords: true };

	if (id) {
		let post = await prisma.post.findUnique({
			where: { id },
			include,
		});

		if (post) {
			if (fullPost)
				post.content = readFileSync(
					`${__dirname}/articles/${id}.html`
				).toString();

			let bookmark = await prisma.bookmark.findFirst({
				where: { userId, postId: id },
			});
			let bookmarked = bookmark ? true : false;

			let like = await prisma.like.findFirst({ where: { likerId: userId } });
			let liked = like ? true : false;

			return {
				code: responseCodes.success,
				payload: { post, bookmarked, liked },
			};
		}
	}
	return missingReq;
};

const createpost = async (req: Request) => {
	let { postData } = req.body;
	//let content = postData.content;

	if (postData) {
		delete postData.id;
		let keywords = postData.keywords;
		delete postData.keywords;

		//postData.keywords = createKeywords(keywords);
		//postData.content = postData.content?.substring(0, 300);

		let post = await prisma.post.create({
			data: {
				...postData,
				keywords: {
					create: keywords,
				},
			},
		});

		writeFile(`${__dirname}/articles/${post.id}.html`, postData.content, () => {
			postData.content = '';
		});

		return { code: responseCodes.success, payload: post.id };
	} else {
		return missingReq;
	}
};

const analyizeText = (postId:string, postContent: string|null) => {
	
	if (postContent===null) return

	postContent = postContent.replace(/(<([^>]+)>)/gi, "")
	postContent = postContent.replace('&nbsp;', ' ')

	let a = natural.PorterStemmer.tokenizeAndStem(postContent);
	let b = new Set(a);
	let c: Array<{ word: string; count: number }> = [];
	

	b.forEach((t) => {
		c.push({ word: t, count: a.find((t2) => t2 === t)?.length || 0 });
	});

	c = c.sort((c1, c2) => (c1.count < c2.count ? 1 : -1));


	for (let i = 0; i< c.length; i++){
		prisma.term.create({data:{ postId, ...c[i]}}).then(r=>console.log(r))

		if (i>=50) break;
	}	

	
};

const refillTerms = async(req: Request)=>{
	prisma.post.findMany({where:{published:true}}).then(posts=>{
		for (let post of posts) {
			prisma.term.findFirst({where:{postId:post.id}}).then(res=>{
				
				if (res===null){
					
					analyizeText(post.id, post.content)
				}
			})
		}
	})

	return { code: responseCodes.success, payload: null };

}

const searchInPosts = async (search:string )=>{
	let a = natural.PorterStemmer.tokenizeAndStem(search);
	let bestArticles: Array<{postId:string, score:number}> = []

	for (let i = 0; i< a.length; i++){
		let df = await prisma.term.count({where:{word:{contains:a[i]}}})
		let totalD = await prisma.post.count({where:{published:true}}) 
		let idf = Math.log(totalD/df)

		let articles = await prisma.term.findMany({where:{word:{contains:a[i]}}, orderBy:{count: 'desc'}, take: 10})

		for (let d of articles){
			let tfIdf = d.count * idf
			console.log(d.postId, tfIdf)

			let acl =  bestArticles.find(b=>b.postId===d.postId)

			if (acl)
				acl.score += tfIdf
			else
				bestArticles.push({postId:d.postId, score: tfIdf})
			
		}
		
	}	

	bestArticles = bestArticles.sort((a1,a2)=>a1.score<a2.score?1:-1)

	return bestArticles.map(acl=>acl.postId);
}

const publishPost = async (req: Request) => {
	let { id } = req.body;

	if (id) {
		let post = await prisma.post.update({
			where: { id },
			data: {
				published: true,
			},
		});

		analyizeText(id, post.content)

		return { code: responseCodes.success, payload: post.id };
	} else {
		return missingReq;
	}
};

const featurePost = async (req: Request) => {
	let { id } = req.body;

	if (id) {
		let post = await prisma.post.update({
			where: { id },
			data: {
				featured: true,
				featuredOn: new Date(),
			},
		});

		return { code: responseCodes.success, payload: post.id };
	} else {
		return missingReq;
	}
};

const removepost = async (req: Request) => {
	let { id } = req.body;

	if (id) {
		await prisma.post.delete({
			where: { id },
			include: { likes: true, comments: true },
		});
		return { code: responseCodes.success, payload: null };
	}
	return missingReq;
};
const updatepost = async (req: Request) => {
	let { postData } = req.body;

	if (postData) {
		let keywords = postData.keywords;
		delete postData.keywords;

		let post = await prisma.post.findUnique({ where: { id: postData.id } });

		if (!post) {
			console.log(postData.id);
			return missingReq;
		}

		post = await prisma.post.update({
			where: { id: postData.id },
			data: {
				...postData,
			},
		});

		writeFile(`${__dirname}/articles/${post.id}.html`, postData.content, () => {
			postData.content = '';
		});

		/*
		writeFile(
			`${__dirname}/articles/${post.id}.json`,
			JSON.stringify(analyizeText(content)),
			() => {}
		);
		*/

		return { code: responseCodes.success, payload: post.id };
	} else {
		return missingReq;
	}
};

/*
const createKeywords = async (keywords: string[]) => {
	let promises = keywords.map(async (k: string) => {
		let a = await prisma.keyword.findFirst({ where: { name: k } });
		if (!a) a = await prisma.keyword.create({ data: { name: k } });

		return a;
	});

	return await Promise.all(promises);
};
*/

const allposts = async (req: Request) => {
	let posts = await prisma.post.findMany({
		where: {},
		include: {
			author: true,
			_count: { select: { likes: true, comments: true } },
		},
	});

	if (posts) {
		return { payload: posts, code: responseCodes.success };
	}
	return missingReq;
};

const getFeaturedPosts = async (req: Request) => {

	let { options } = req.body;
	
	let posts = await loadby(
		{},
		options.createdAt,
		options.published,
		options.featured===true?true:false,
	);

	if (posts) {
		return { code: responseCodes.success, payload: posts };
	}
	
	
	return missingReq;
}


const byCategoryName = async (req: Request) => {
	let { name } = req.body;
	let { options } = req.body;

	if (name) {
		let cat = await prisma.category.findFirst({
			where: { name },
			include: { Children: true },
		});
		if (cat) {
			let posts = await loadby(
				{
					OR: [
						{ categoryId: cat.id },
						...cat.Children.map((c) => {
							return { categoryId: c.id };
						}),
					],
				},
				options.createdAt,
				options.published,
				options.featured===true?true:false,
			);
			if (posts) {
				return { code: responseCodes.success, payload: posts };
			}
		}
	}
	return missingReq;
};



const byAuthor = async (req: Request) => {
	let { id } = req.body;
	let { options } = req.body;

	if (id) {
		let posts = await loadby(
			{ authorId: id },
			options.createdAt,
			options.published
		);

		if (posts) {
			return { payload: posts, code: responseCodes.success };
		}
	}
	return missingReq;
};

const loadby = async (
	criteria: {},
	createdAt: Date = new Date(),
	published: boolean = true,
	featured: boolean = false,
) => {
	if (published) criteria = { ...criteria, published: true };
	if (featured) criteria = {...criteria, featured: true}

	let posts = await prisma.post.findMany({
		where: { ...criteria, createdAt: { lt: createdAt } },
		include: { author: true, category: true, keywords: true },
		orderBy: featured? {featuredOn:'desc'}: { createdAt: 'desc' },
		take: 5,
	});
	return posts;
};

const search = async (req: Request) => {
	let { term } = req.body;
	let { options } = req.body;

	let bestArticles = await searchInPosts(term)

	let posts = await prisma.post.findMany({
		where:{id: {in: bestArticles}},
		include: { author: true, category: true, keywords: true },
	})

	/*
	if (term) {
		let posts = await loadby(
			{
				OR: [
					{
						title: {
							contains: term,
						},
					},
					{
						exerpt: {
							contains: term,
						},
					},
				],
			},
			options.createdAt,
			options.published
		);
	*/
		if (posts) {
			return { code: responseCodes.success, payload: posts };
		}
	
	return missingReq;
};

export default {
	getpost,
	allposts,
	createpost,
	publishPost,
	featurePost,
	removepost,
	updatepost,
	byCategoryName,
	byAuthor,
	search,
	refillTerms,
	getFeaturedPosts,
};
