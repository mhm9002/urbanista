import { Bookmark, PrismaClient } from '@prisma/client';
import { responseCodes, missingReq } from './readyResponse';
import { Request } from 'express';

const prisma = new PrismaClient();

const getUserBookmarks = async (req: Request) => {
	const { id } = req.body;

	if (id) {
		let bookmarks = await prisma.bookmark.findMany({
			where: { userId: id },
			orderBy: { bookmarkedAt: 'desc' },
		});

		if (bookmarks) {
			let posts = await Promise.all(
				bookmarks.map(async (b) => {
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

const addToBookmarks = async (req: Request) => {
	const { userId, postId } = req.body;

	if (postId && userId) {
		let bookmark = await prisma.bookmark.findFirst({
			where: {
				userId,
				postId,
			},
		});

		if (bookmark) {
			await prisma.bookmark.delete({ where: { id: bookmark.id } });
			return { code: responseCodes.bookmarkedRemoved, payload: null };
		}

		bookmark = await prisma.bookmark.create({
			data: {
				userId,
				postId,
			},
		});

		if (bookmark) {
			return { code: responseCodes.success, payload: null };
		}
	}
	return missingReq;
};

export default {
	getUserBookmarks,
	addToBookmarks,
};
