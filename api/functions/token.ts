import { User } from '@prisma/client';
import { Request } from 'express';
import jwt, { Secret, sign } from 'jsonwebtoken';
import { responseCodes } from './readyResponse';

const validateToken = (
	req: Request,
	next: (req: Request) => Promise<any>
) => {
	
	let token = (
		req.headers['x-access-token'] || req.headers['authorization']
	)?.toString(); // Express headers are auto converted to lowercase

	if (!token) {
		return({code: responseCodes.invalidToken, payload:null})
	}
	if (token.startsWith('Bearer ')) {
		// Remove Bearer from string
		token = token.slice(7, token.length);
	}

	let secret: Secret = process.env.JWT_SECRET || '';

	return new Promise((resolve, reject)=>{
		jwt.verify(token||'', secret, (err, decoded) => {
			if (!err) {
				console.log(decoded)
				next(req).then(resolve)		
			} else {
				resolve({code: responseCodes.invalidToken, payload:null})
			}
		});
	})
};

const generateToken = (user: User) => {
	let secret: Secret = process.env.JWT_SECRET || '';
	return sign({ user_id: user.id, email: user.email }, secret, {
		expiresIn: '2 days',
	});
};

export { validateToken, generateToken }
