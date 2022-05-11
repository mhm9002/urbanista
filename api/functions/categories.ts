import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const getCategory = (req: Request, res: Response) => {
	console.log(1);
	res.send('hi');
};

const createCategory = async (req: Request, res: Response) => {
	let { name } = req.body;

	if (name) {
		let category = await prisma.category.create({ data: { name } });
		res.send('category created');
	} else {
		res.send('missing params');
	}
};
const removeCategory = (req: Request, res: Response) => {};
const updateCategory = (req: Request, res: Response) => {};
const allCategories = async (req: Request, res: Response) => {
	console.log(1);
	let categorys = await prisma.category.findMany({});

	res.send(categorys);
};

export default {
	getCategory,
	allCategories,
	createCategory,
	removeCategory,
	updateCategory,
};
