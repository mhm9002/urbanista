import { Response, Request } from 'express';
import userFunctions from './functions/user';
import postFunctions from './functions/post';
import catFunctions from './functions/categories';
import queryList from '../client/src/queryList';

type requestForm = {
	query: queryList;
	function: (req: Request, res: Response) => any;
	tokenValidation?: boolean;
};

const requests: Array<requestForm> = [
	{
		query: queryList.createUser,
		function: userFunctions.createUser,
		tokenValidation: true,
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
		tokenValidation: true,
	},
	{
		query: queryList.allUsers,
		function: userFunctions.allUsers,
		tokenValidation: true,
	},
	{
		query: queryList.createPost,
		function: postFunctions.createpost,
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

export default requests;
