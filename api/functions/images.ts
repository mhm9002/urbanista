import { missingReq, responseCodes } from './readyResponse';
import { Request } from 'express';

const upload = async (req: Request) => {
	console.log(req.file);
	return {
		code: responseCodes.success,
		payload: { filename: req.file?.filename },
	};
};

export default { upload };
