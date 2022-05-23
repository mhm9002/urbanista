import { missingReq, responseCodes } from './readyResponse';
import { Request } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const upload = async (req: Request) => {
	console.log(req.file);
	return {
		code: responseCodes.success,
		payload: { filename: req.file?.filename },
	};
};

const uploadProfile = async (req: Request) => {
	const {userId} = req.body

	await prisma.user.update({where:{id:userId},data:{profile:req.file?.filename}})

	return {
		code: responseCodes.success,
		payload: { filename: req.file?.filename },
	};
};


export default { upload, uploadProfile };
