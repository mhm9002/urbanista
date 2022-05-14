import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { readFile, readFileSync, writeFile } from 'fs';
import { missingReq } from './readyResponse';

const prisma = new PrismaClient();

const getpost = async (req: Request) => {
	let { id, fullPost } = req.body;

	if (id) {
		let post = await prisma.post.findUnique({
			where: { id },
			include: { author: true, category: true, keywords: true, likes: true },
		});

		if (post) {
			if (fullPost)
				post.content = readFileSync(
					`${__dirname}/articles/${id}.html`
				).toString();

			return { success: true, payload: post };
		}
	}
	return missingReq;
};

const createpost = async (req: Request) => {
	let { postData } = req.body;
	let content = postData.content;

	if (postData) {
		delete postData.id;
		postData.content = postData.content?.substring(0, 300);

		let post = await prisma.post.create({ data: postData });
		writeFile(`${__dirname}/articles/${post.id}.html`, content, () => {});

		return { success: true, message: 'category created', payload: post.id };
	} else {
		return missingReq;
	}
};
const removepost = async (req: Request) => {
	return missingReq;
};
const updatepost = async (req: Request) => {
	let { postData } = req.body;
	let content = postData.content;

	if (postData) {
		postData.content = postData.content?.substring(0, 300);

		let post = await prisma.post.update({
			where: { id: postData.id },
			data: postData,
		});

		writeFile(`${__dirname}/articles/${post.id}.html`, content, () => {});

		return { success: true, message: 'category updated', payload: post.id };
	} else {
		return missingReq;
	}
};
const allposts = async (req: Request) => {
	return missingReq;
};
const byCategoryName = async (req: Request) => {
	let { name } = req.body;
	let { createdAt } = req.body || new Date();

	if (name) {
		let cat = await prisma.category.findFirst({ where: { name } });
		if (cat) {
			let posts = await loadby({ categoryId: cat.id }, createdAt);
			if (posts) {
				return { success: true, payload: posts };
			}
		}
	}
	return missingReq;
};
const byAuthor = async (req: Request) => {
	let { id } = req.body;
	let { createdAt } = req.body || new Date();

	if (id) {
		let posts = await loadby({ authorId: id }, createdAt);

		if (posts) {
			return { success: true, payload: posts };
		}
	}
	return missingReq;
};

const loadby = async (criteria: {}, createdAt: any) => {
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
	removepost,
	updatepost,
	byCategoryName,
	byAuthor,
};
