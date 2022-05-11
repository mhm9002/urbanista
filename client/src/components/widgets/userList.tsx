import { User } from '@prisma/client';
import React from 'react';
import { UserRow } from './userRow';

interface IUserListProps {
	users: Array<User>;
}

const UserList: React.FC<IUserListProps> = (props) => {
	return (
		<div className='container tile is-ancestor'>
			{props.users.map((u, id) => {
				return <UserRow data={u} key={id} />;
			})}
		</div>
	);
};

export default UserList;
