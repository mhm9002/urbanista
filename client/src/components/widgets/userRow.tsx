import { User } from '@prisma/client';

interface IUserRowProps {
	data: User;
}

export const UserRow: React.FC<IUserRowProps> = (props) => {
	return (
		<div className='tile card'>
			<div className='card-image'>
				<figure className='image is-4by3'>
					<img
						src='https://bulma.io/images/placeholders/1280x960.png'
						alt='Placeholder'
					/>
				</figure>
			</div>
			<div className='card-content'>
				<div className='media'>
					<div className='media-left'>
						<figure className='image is-48x48'>
							<img
								src='https://bulma.io/images/placeholders/96x96.png'
								alt='Placeholder'
							/>
						</figure>
					</div>
					<div className='media-content'>
						<p className='title is-4'>{props.data.name}</p>
						<p className='subtitle is-6'>{props.data.email}</p>
					</div>
				</div>

				<div className='content'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
					iaculis mauris.
					<br />
					<time dateTime='2016-1-1'>11:09 PM - 1 Jan 2016</time>
				</div>
			</div>
		</div>
	);
};
