import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const getUser = (req: Request, res: Response) => {
	console.log(1);
	res.send('hi');
};

const createUser = (req: Request, res: Response) => {};
const removeUser = (req: Request, res: Response) => {};
const updateUser = (req: Request, res: Response) => {};
const allUsers = async (req: Request, res: Response) => {
	console.log(2);
	let users = await prisma.user.findMany({});

	res.send(users);
};

export default { getUser, allUsers, createUser, removeUser, updateUser };
