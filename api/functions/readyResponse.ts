import { queryRespose, responseCode } from '../../frontend/src/commonTypes';

export const responseCodes: {[key:string]:responseCode} = {
	missingParam: {code:999, message:"Missing parameters"},
	success: {code:100, message:"Task successful"},
	userActivationNeeded: {code:201, message:"Please activate your account via the link sent to your email"},
	userEmailUsed: {code:202, message:'Email already exists'},
}
	

export const missingReq: queryRespose = {
	success: false,
	payload: null,
	...responseCodes.missingParam
};


