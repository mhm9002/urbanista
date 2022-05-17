import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {requests, uploadRequests} from './api/requests';
import validateToken from './api/functions/token';
import multer from 'multer';


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

requests.forEach((r) =>
	app.post(`/api/${r.query}`, async (req, res) =>
		res.send(await r.function(req))
	)
);

uploadRequests.forEach(r=>{
	
	const upload = multer({dest:'api/functions/images/'})
	
	app.post(`/api/${r.query}`, upload.single('file'), async(req,res)=>res.send(await r.function(req)))
})

app.post(`/api/loadImage`, (req:Request,res:Response)=>{
	const {path} = req.body
	
	res.sendFile(__dirname+'/'+path)
})


//  not r.tokenValidation ? r.function : r.function
//(req, res) => validateToken(req, res, r.function)

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
