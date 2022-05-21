import { Request } from 'express';
import userFunctions from './functions/user';
import postFunctions from './functions/post';
import catFunctions from './functions/categories';
import imageFunctions from './functions/images';
import bookmarkFunctions from './functions/bookmarks';
import likeFunctions from './functions/like';
import commentFunctions from './functions/comments';
import { queryList, uploadQueryList } from '../frontend/src/helpers/queryList';
import { queryRespose } from '../frontend/src/commonTypes';

type requestForm = {
	query: string;
	function: (req: Request) => Promise<queryRespose>;
	tokenValidation?: boolean;
};

const requests: Array<requestForm> = [
	{
		query: queryList.createUser,
		function: userFunctions.createUser,
		tokenValidation: false,
	},
	{
		query: queryList.removeUser,
		function: userFunctions.removeUser,
		tokenValidation: true,
	},
	{
		query: queryList.updateUser,
		function: userFunctions.updateUser,
		tokenValidation: true,
	},
	{
		query: queryList.getUser,
		function: userFunctions.getUser,
		tokenValidation: false,
	},
	{
		query: queryList.validateUser,
		function: userFunctions.validateUser,
		tokenValidation: false,
	},
	{
		query: queryList.login,
		function: userFunctions.login,
		tokenValidation: false,
	},
	{
		query: queryList.allUsers,
		function: userFunctions.allUsers,
		tokenValidation: true,
	},
	{
		query: queryList.userBookmarks,
		function: bookmarkFunctions.getUserBookmarks,
		tokenValidation: true,
	},
	{
		query: queryList.bookmarkPost,
		function: bookmarkFunctions.addToBookmarks,
		tokenValidation: true,
	},
	{
		query: queryList.userLikes,
		function: likeFunctions.getUserLikes,
		tokenValidation: true,
	},
	{
		query: queryList.likePost,
		function: likeFunctions.likePost,
		tokenValidation: true,
	},
	{
		query: queryList.addComment,
		function: commentFunctions.addComment,
		tokenValidation: true,
	},
	{
		query: queryList.createPost,
		function: postFunctions.createpost,
		tokenValidation: true,
	},
	{
		query: queryList.publishPost,
		function: postFunctions.publishPost,
		tokenValidation: true,
	},
	{
		query: queryList.removePost,
		function: postFunctions.removepost,
		tokenValidation: true,
	},
	{
		query: queryList.updatePost,
		function: postFunctions.updatepost,
		tokenValidation: true,
	},
	{
		query: queryList.getPost,
		function: postFunctions.getpost,
		tokenValidation: true,
	},
	{
		query: queryList.allPost,
		function: postFunctions.allposts,
		tokenValidation: true,
	},
	{
		query: queryList.postByCategoryName,
		function: postFunctions.byCategoryName,
		tokenValidation: false,
	},
	{
		query: queryList.postByAuthor,
		function: postFunctions.byAuthor,
		tokenValidation: false,
	},
	{
		query: queryList.getCategory,
		function: catFunctions.getCategory,
		tokenValidation: false,
	},
	{
		query: queryList.allCategories,
		function: catFunctions.allCategories,
		tokenValidation: false,
	},
	{
		query: queryList.createCategory,
		function: catFunctions.createCategory,
		tokenValidation: true,
	},
	{
		query: queryList.removeCategory,
		function: catFunctions.removeCategory,
		tokenValidation: true,
	},
	{
		query: queryList.updateCategory,
		function: catFunctions.updateCategory,
		tokenValidation: true,
	},
];

const uploadRequests: Array<requestForm> = [
	{
		query: uploadQueryList.uploadImage,
		function: imageFunctions.upload,
		tokenValidation: true,
	},
];

export { requests, uploadRequests };
