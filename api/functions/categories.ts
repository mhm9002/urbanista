import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { queryRespose } from '../../frontend/src/commonTypes';
import { missingReq, responseCodes } from './readyResponse';

const prisma = new PrismaClient();

const getCategory = async (req: Request) => {
	const { id } = req.body;
	if (id) {
		let cat = await prisma.category.findUnique({ where: id });
		if (cat) return { code:responseCodes.success, payload: cat  };
	}

	return missingReq;
};

const createCategory = async (req: Request) => {
	let { name } = req.body;

	if (name) {
		let category = await prisma.category.create({ data: { name } });
		if (category)
			return {
				code:responseCodes.success,
				payload: category.id,
				
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

	let res: queryRespose = { code:responseCodes.success, payload: categories};
	return res;
};

export default {
	getCategory,
	allCategories,
	createCategory,
	removeCategory,
	updateCategory,
};
