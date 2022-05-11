import { Request, Response } from 'express';

const getpost = (req: Request, res: Response) => {
	return res.send('hi');
};

const createpost = (req: Request, res: Response) => {};
const removepost = (req: Request, res: Response) => {};
const updatepost = (req: Request, res: Response) => {};
const allposts = (req: Request, res: Response) => {};

export default { getpost, allposts, createpost, removepost, updatepost };
