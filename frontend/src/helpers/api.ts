const fetchApi = async (query: string, payload: any) => {
	return (
		await fetch(`http://localhost:4000/api/${query}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		})
	).json();
};

export default fetchApi;
