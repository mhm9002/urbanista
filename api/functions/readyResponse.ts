import { queryRespose, responseCode } from '../../frontend/src/commonTypes';

export const responseCodes: {[key:string]:responseCode} = {
	missingParam: {success: false, code:999, message:"Missing parameters"},
	success: {success: true,code:100, message:"Task successful"},
	userActivationNeeded: {success: false,code:201, message:"Please activate your account via the link sent to your email"},
	userEmailUsed: {success: false,code:202, message:'Email already exists'},
}
	

export const missingReq: queryRespose = {
	
	payload: null,
	code: responseCodes.missingParam
};


