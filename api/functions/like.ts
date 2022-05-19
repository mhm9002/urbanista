import { Like, PrismaClient } from "@prisma/client";
import { responseCodes, missingReq } from "./readyResponse";
import { Request } from 'express';

const prisma = new PrismaClient();

const getUserLikes = async (req: Request) => {
	const { id } = req.body;

	if (id) {
		let likes = await prisma.like.findMany({
			where: { likerId: id }
		});

		if (likes) {
			let posts = await Promise.all(
				likes.map(async (b) => {
					return await prisma.post.findUnique({
						where: { id: b.postId },
						include: {
							author: true,
							category: true,
							keywords: true,
							likes: true,
						},
					});
				})
			);

			return { code: responseCodes.success, payload: posts };
		}
	}
	return missingReq;
};

const likePost = async (req: Request) => {
	const { userId, postId } = req.body;

	if (postId && userId) {
		let like = await prisma.like.findFirst({
			where: {
				likerId: userId,
				postId,
			},
		});

		if (like) {
			await prisma.like.delete({where:{id:like.id}})
			return { code: responseCodes.likeRemoved, payload: null };
		}

		like = await prisma.like.create({
			data: {
				likerId: userId,
				postId,
			},
		});

		if (like) {
			return { code: responseCodes.success, payload: null };
		}
	}
	return missingReq;
};


export default {
    getUserLikes,
    likePost
};
