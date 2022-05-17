
import type { queryRespose } from '../commonTypes';
import { queryList, uploadQueryList } from './queryList';

const fetchApi = async (query: string, payload: any) => {
	let a = await fetch(`http://localhost:4000/api/${query}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});

	let res = await a.json();
	let res2: queryRespose = { ...res };

	return await res2;
};

const uploadApi = async(query:string, payload:File)=>{
	const fd= new FormData()
	fd.append('file',payload);

	
	
	let a = await fetch(`http://localhost:4000/api/${query}`, {
		method: 'POST',
		
		body: fd,
		
	});

	let res = await a.json();
	let res2: queryRespose = { ...res };

	console.log(res2)

	return (await loadFileApi(uploadQueryList.loadImage, {path:res2.payload.path}))

	//return `http://localhost:4000/${res2.payload.destination}/${res2.payload.filename}`
	//return 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/480px-JavaScript-logo.png'
}

const loadFileApi = async(query:string, payload:{path:string})=>{
	let a = await fetch(`http://localhost:4000/api/${query}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});

	return await a.json()
}

export {fetchApi, uploadApi, loadFileApi};
