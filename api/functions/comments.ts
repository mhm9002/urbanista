import { Like, PrismaClient } from '@prisma/client';
import { responseCodes, missingReq } from './readyResponse';
import { Request } from 'express';

const prisma = new PrismaClient();

const getPostComments = async (req: Request) => {
	const { id } = req.body;

	if (id) {
		let comments = await prisma.comment.findMany({
			where: { postId: id },
			include: {
				commenter: true,
				Children: true,
			},
		});

		if (comments) {
			return { code: responseCodes.success, payload: comments };
		}
	}
	return missingReq;
};

const addComment = async (req: Request) => {
	const { userId, postId, onCommentId, content } = req.body;

	if (postId && userId) {
		let data = {
			commenterId: userId,
			postId,
			content,
			parent_id: onCommentId,
		};

		if (onCommentId === '') delete data.parent_id;

		let c = await prisma.comment.create({
			data,
		});

		let comment = await prisma.comment.findUnique({
			where: { id: c.id },
			include: { commenter: true },
		});

		if (comment) {
			return { code: responseCodes.success, payload: comment };
		}
	}
	return missingReq;
};

export default {
	getPostComments,
	addComment,
};
