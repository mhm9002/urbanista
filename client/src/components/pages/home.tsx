import { Category, User } from '@prisma/client';
import { useEffect, useState } from 'react';
import useApi from '../../helpers/useApi';
import queryList from '../../queryList';
import AddCategoryForm from '../widgets/addCategoryForm';
import CategoryList from '../widgets/categoryList';
import UserList from '../widgets/userList';

interface IHomePageProps {}

export const HomePage: React.FC<IHomePageProps> = (props) => {
	const { fetchApi } = useApi();
	const [allUsers, setAllUsers] = useState<User[]>([]);
	const [allCategories, setAllCategories] = useState<Category[]>([]);

	useEffect(() => {
		fetchApi(queryList.allUsers, {}).then((res) => {
			setAllUsers(res);
			fetchApi(queryList.allCategories, {}).then((res2) =>
				setAllCategories(res2)
			);
		});
	}, []);

	return (
		<div>
			Hello World.
			<UserList users={allUsers} />
			<CategoryList cats={allCategories} />
			<AddCategoryForm />
		</div>
	);
};
