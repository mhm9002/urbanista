import { token } from '../appStore';
import type { queryRespose } from '../commonTypes';
import { queryList, uploadQueryList } from './queryList';

const fetchApi = async (
	query: string,
	payload: any,
	tokenNeeded: boolean = false
) => {
	let authorization = tokenNeeded
		? { authorization: 'Bearer ' + token.get() }
		: {};

	let a = await fetch(`http://localhost:4000/api/${query}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...authorization,
		},
		body: JSON.stringify(payload),
	});

	let res = await a.json();
	let res2: queryRespose = { ...res };

	return await res2;
};

const uploadApi = async (query: string, payload: File, userId?:string) => {
	const fd = new FormData();
	fd.append('file', payload);

	if (userId && userId!=='')
		fd.append('userId', userId);

	let a = await fetch(`http://localhost:4000/api/${query}`, {
		method: 'POST',

		body: fd,
	});

	let res = await a.json();
	let res2: queryRespose = { ...res };

	if (query === uploadQueryList.uploadImage)
		return 'http://localhost:4000/api/images/'+res2.payload.filename;
	else
		return res2.payload.filename;
	//return `http://localhost:4000/${res2.payload.destination}/${res2.payload.filename}`
	//return 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/480px-JavaScript-logo.png'
};


export { fetchApi, uploadApi };
