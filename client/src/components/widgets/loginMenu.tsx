interface ILoginMenu {}

export const LoginMenu: React.FC<ILoginMenu> = (props) => {
	return (
		<div className='navbar-end'>
			<div className='navbar-item'>
				<div className='buttons'>
					<a className='button is-primary'>
						<strong>Sign up</strong>
					</a>
					<a className='button is-light'>Log in</a>
				</div>
			</div>
		</div>
	);
};
