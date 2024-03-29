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
	const {id, name, parent_id} = req.body;

	if (id){
		let cat = await prisma.category.update({where:{id}, data:{name, parent_id}})

		if (cat)
			return  {code:responseCodes.success, payload: null}
	}

	return missingReq;
};
const allCategories = async (req: Request) => {
	let categories = await prisma.category.findMany({
		where:{}, 
		include:{Children:true, _count:{ select: {posts:true}}},
		

	});

	return { code:responseCodes.success, payload: categories};
	
};

export default {
	getCategory,
	allCategories,
	createCategory,
	removeCategory,
	updateCategory,
};
