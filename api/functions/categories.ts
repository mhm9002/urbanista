import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { queryRespose } from '../../frontend/src/commonTypes';
import { missingReq } from './readyResponse';

const prisma = new PrismaClient();

const getCategory = async (req: Request) => {
	const { id } = req.body;
	if (id) {
		let cat = await prisma.category.findUnique({ where: id });
		if (cat) return { success: true, payload: cat };
	}

	return missingReq;
};

const createCategory = async (req: Request) => {
	let { name } = req.body;

	if (name) {
		let category = await prisma.category.create({ data: { name } });
		if (category)
			return {
				success: true,
				payload: category.id,
				message: 'category created',
			};
	}

	return missingReq;
};
const removeCategory = async (req: Request) => {
	return missingReq;
};
const updateCategory = async (req: Request) => {
	return missingReq;
};
const allCategories = async (req: Request) => {
	let categories = await prisma.category.findMany({});

	let res: queryRespose = { success: true, payload: categories };
	return res;
};

export default {
	getCategory,
	allCategories,
	createCategory,
	removeCategory,
	updateCategory,
};
