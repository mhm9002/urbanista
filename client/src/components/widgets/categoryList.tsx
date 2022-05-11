import { Category } from '@prisma/client';
import React from 'react';

interface ICategoryListProps {
	cats: Array<Category>;
}

const UserList: React.FC<ICategoryListProps> = (props) => {
	return (
		<div className=''>
			{props.cats.map((c, id) => {
				return (
					<article className='media' key={id}>
						<div className='media-content'>
							<div className='content'>{c.name}</div>
						</div>
					</article>
				);
			})}
		</div>
	);
};

export default UserList;
