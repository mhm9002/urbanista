import type { queryRespose } from '../commonTypes';

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

export default fetchApi;
