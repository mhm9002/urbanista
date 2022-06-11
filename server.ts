import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { requests, uploadRequests } from './api/requests';
import { validateToken } from './api/functions/token';
import multer from 'multer';
import { queryList, uploadQueryList } from './frontend/src/helpers/queryList';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

//console.log('10');

app.use(cors());
app.use(bodyParser.json());

requests.forEach((r) =>
	app.post(`/api/${r.query}`, async (req, res) =>
		res.send(
			r.tokenValidation
				? await validateToken(req, r.function)
				: await r.function(req)
		)
	)
);

app.use('/api/images', express.static(__dirname + '/api/functions/images'));
app.use('/api/profiles', express.static(__dirname + '/api/functions/profiles'));

uploadRequests.forEach((r) => {
	let dest =
		r.query === uploadQueryList.uploadImage
			? 'api/functions/images/'
			: 'api/functions/profiles/';
	const upload = multer({ dest });

	app.post(`/api/${r.query}`, upload.single('file'), async (req, res) =>
		res.send(await r.function(req))
	);
});

/*
app.post(`/api/loadImage`, (req:Request,res:Response)=>{
	const {path} = req.body
	
	res.sendFile(__dirname+'/'+path)
})
*/

//  not r.tokenValidation ? r.function : r.function
//(req, res) => validateToken(req, res, r.function)

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
