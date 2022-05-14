import { queryRespose } from '../../frontend/src/commonTypes';

export const missingReq: queryRespose = {
	success: false,
	payload: null,
	message: 'missing params',
};
