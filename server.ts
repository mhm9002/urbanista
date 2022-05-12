import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import requests from './api/requests';
import validateToken from './api/functions/token';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

requests.forEach((r) => app.post(`/api/${r.query}`, r.function));
		
	
		//!r.tokenValidation ? r.function : r.function
		//(req, res) => validateToken(req, res, r.function)
	

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
