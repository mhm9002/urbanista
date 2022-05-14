import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { missingReq } from './readyResponse';

const prisma = new PrismaClient();

const getUser = async (req: Request) => {
	const { id } = req.body;

	let user = await prisma.user.findFirst({ where: { id } });
	if (user) {
		user.password = '';
		return { success: true, payload: user };
	} else {
		return missingReq;
	}
};

const login = async (req: Request) => {
	const { email, password } = req.body;

	let user = await prisma.user.findFirst({ where: { email, password } });
	console.log(user);
	if (user) {
		user.password = '';
		return { success: true, payload: user };
	} else {
		return missingReq;
	}
};

const createUser = async (req: Request) => {
	return missingReq;
};
const removeUser = async (req: Request) => {
	return missingReq;
};
const updateUser = async (req: Request) => {
	return missingReq;
};
const allUsers = async (req: Request) => {
	let users = await prisma.user.findMany({});

	return { success: true, payload: users };
};

export default { getUser, allUsers, createUser, removeUser, updateUser, login };
