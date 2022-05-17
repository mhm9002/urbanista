import { missingReq, responseCodes } from "./readyResponse";
import { Request } from 'express';

const upload = async (req: Request) => {
    return {code:responseCodes.success, payload:{path:req.file?.path}};
}

export default {upload}