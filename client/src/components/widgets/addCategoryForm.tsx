import { Category } from '@prisma/client';
import React, { useState } from 'react';
import useApi from '../../helpers/useApi';
import { queryList} from '../../queryList';

const UserList: React.FC = () => {
	const [name, setName] = useState<string>('');
	const [loading, setLoading] = useState(false);
	const { fetchApi } = useApi();

	const addCategory = async () => {
		if (loading) return;
		setLoading(true);
		await fetchApi(queryList.createCategory, { name }).then((res) =>
			setLoading(false)
		);
	};

	return (
		<div>
			<input
				type={'text'}
				placeholder='name'
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<button onClick={addCategory}>Add Category</button>
		</div>
	);
};

export default UserList;
