import { User } from '@prisma/client';
import { Request, Response } from 'express';
import jwt, { Secret, sign } from 'jsonwebtoken';

const validateToken = (
	req: Request,
	res: Response,
	next: (req: Request, res: Response) => any
) => {
	//temp
	if (1 === 1) {
		next(req, res);
		return;
	}

	let token = (
		req.headers['x-access-token'] || req.headers['authorization']
	)?.toString(); // Express headers are auto converted to lowercase

	if (!token) {
		return res.json({
			error: 'Auth token is not supplied',
		});
	}
	if (token.startsWith('Bearer ')) {
		// Remove Bearer from string

		token = token.slice(7, token.length);
	}

	let secret: Secret = process.env.JWT_SECRET?.toString() || '';

	if (token) {
		jwt.verify(token, secret, (err, decoded) => {
			if (err) {
				return res.json({
					error: 'Token is not valid',
				});
			} else {
				//req.decoded = decoded;
				next(req, res);
			}
		});
	} else {
		return res.json({
			error: 'Auth token is not supplied',
		});
	}
};

const getToken = (user: User) => {
	let secret: Secret = process.env.JWT_SECRET || '';
	return sign({ user_id: user.id, email: user.email }, secret, {
		expiresIn: '2 days',
	});
};

export { validateToken, getToken };
