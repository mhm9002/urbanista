const fetchApi = async (query: string, payload: any) => {
	return (
		await fetch(`api/${query}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		})
	).json();
};

export default fetchApi;
