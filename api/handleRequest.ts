import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import requests from './requests';

const prisma = new PrismaClient();

const handleRequest = async (req: Request, res: Response) => {
	const { request } = req.body;

	switch (request) {
		case requests[0].query:
			let user = await prisma.user.findFirst({
				where: { email: req.body.email },
			});
			if (user) {
				res.send('user already registered');
				return;
			}

			user = await prisma.user.create({
				data: {
					name: req.body.name,
					email: req.body.email,
					password: req.body.password,
				},
			});

			res.send(`user created: ${user.name}`);
			break;
		case requests[4].query:
			let users = await prisma.user.findMany({});
			res.send(users);
			break;
		default:
			console.log(request);
	}
};

export default handleRequest;
