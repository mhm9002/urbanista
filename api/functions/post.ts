import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const getpost = (req: Request, res: Response) => {
	return res.send('hi');
};

const createpost = async (req: Request, res: Response) => {
	let { postData } = req.body;

	if (postData) {
		delete postData.id;
		
		let post = await prisma.post.create({ data:  postData  });
		
		res.send({message:'category created'});
	} else {
		res.send({message:'missing params'});
	}
};
const removepost = (req: Request, res: Response) => {};
const updatepost = (req: Request, res: Response) => {};
const allposts = (req: Request, res: Response) => {};

export default { getpost, allposts, createpost, removepost, updatepost };
