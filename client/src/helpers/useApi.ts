import { useEffect, useState } from 'react';
import { queryList} from '../queryList';

const useApi = () => {
	const fetchApi = async (query: queryList, payload: any) => {
		return (
			await fetch(`/api/${query}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			})
		).json();
	};

	return { fetchApi };
};

export default useApi;
