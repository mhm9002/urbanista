import { queryRespose, responseCode } from '../../frontend/src/commonTypes';

export const responseCodes: { [key: string]: responseCode } = {
	missingParam: { success: false, code: 999, message: 'Missing parameters' },
	invalidToken: { success: false, code: 998, message: 'InvlaidToken' },
	success: { success: true, code: 100, message: 'Task successful' },
	userActivationNeeded: {
		success: false,
		code: 201,
		message: 'Please activate your account via the link sent to your email',
	},
	userEmailUsed: { success: false, code: 202, message: 'Email already exists' },
	bookmarkedRemoved: {
		success: true,
		code: 251,
		message: 'Bookmark removed',
	},
	likeRemoved: {
		success: true,
		code: 271,
		message: 'Like removed',
	},
};

export const missingReq: queryRespose = {
	payload: null,
	code: responseCodes.missingParam,
};
