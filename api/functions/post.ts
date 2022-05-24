import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { readFile, readFileSync, writeFile } from 'fs';
import { missingReq, responseCodes } from './readyResponse';

const prisma = new PrismaClient();

const getpost = async (req: Request) => {
	let { id, fullPost, userId } = req.body;

	if (id) {
		let post = await prisma.post.findUnique({
			where: { id },
			include: {
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
			},
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
		writeFile(
			`${__dirname}/articles/${post.id}.html`,
			postData.content,
			() => {}
		);

		return { code: responseCodes.success, payload: post.id };
	} else {
		return missingReq;
	}
};

const publishPost = async (req: Request) => {
	let { id } = req.body;
	//let content = postData.content;

	if (id) {
		let post = await prisma.post.update({
			where: { id },
			data: {
				published: true,
			},
		});

		return { code: responseCodes.success, payload: post.id };
	} else {
		return missingReq;
	}
};

const featurePost = async (req: Request) => {
	let { id } = req.body;
	//let content = postData.content;

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
	//let content = postData.content;

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

		let post = await prisma.post.update({
			where: { id: postData.id },
			data: {
				...postData,
				keywords: {
					create: keywords,
				},
			},
		});

		writeFile(
			`${__dirname}/articles/${post.id}.html`,
			postData.content,
			() => {}
		);

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
const byCategoryName = async (req: Request) => {
	let { name } = req.body;
	let { options } = req.body;

	if (name) {
		let cat = await prisma.category.findFirst({ where: { name }, include: {Children: true} });
		if (cat) {
			let posts = await loadby(
				{ OR:  [{categoryId: cat.id}, ...cat.Children.map(c=>{return {categoryId:c.id}})]},
				options.createdAt,
				options.published
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
	published: boolean = true
) => {
	if (published) criteria = { ...criteria, published: true };

	let posts = await prisma.post.findMany({
		where: { ...criteria, createdAt: { lt: createdAt } },
		include: { author: true, category: true, keywords: true },
		orderBy: { createdAt: 'desc' },
		take: 5,
	});
	return posts;
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
};
