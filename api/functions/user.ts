import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { missingReq, responseCodes } from './readyResponse';
import functions from './functions';

const prisma = new PrismaClient();

const getUser = async (req: Request) => {
	const { id } = req.body;

	let user = await prisma.user.findFirst({ where: { id } });
	if (user) {
		user.password = '';
		return { code:responseCodes.success, payload: user };
	} else {
		return missingReq;
	}
};

const login = async (req: Request) => {
	const { email, password } = req.body;

	//functions.sendMail(email, 'Test 1', 'This is test' )
	//await prisma.user.update({ where: { email }, data: { activated: true } });

	let user = await prisma.user.findFirst({ where: { email, password } });

	if (user && user.activated) {
		user.password = '';
		return { code:responseCodes.success, payload: user };
	} else if (user) {
		return {
			
			payload: null,
			code:responseCodes.userActivationNeeded,
		};
	} else {
		return missingReq;
	}
};

const createUser = async (req: Request) => {
	const { name, email, password } = req.body;

	let user = await prisma.user.findFirst({ where: { email } });

	if (user)
		return {code:responseCodes.userEmailUsed, payload: {} };

	user = await prisma.user.create({ data: { name, email, password } });

	if (user) {
		user.password = '';
		return { code:responseCodes.success,payload: user};
	}

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

	return { code:responseCodes.success, payload: users };
};

export default { getUser, allUsers, createUser, removeUser, updateUser, login };

