import { useGlobalState, pages } from '../../helpers/state';

export const BrandMenu: React.FC = () => {
	const [activePage, setActivePage] = useGlobalState('activePage');

	const handleHomeClick = () => {
		setActivePage(pages.home);
	};

	return (
		<div className='navbar-brand'>
			<a className='navbar-item' onClick={handleHomeClick} href='#'>
				<img
					src='https://bulma.io/images/bulma-logo.png'
					width='112'
					height='28'
				/>
			</a>

			<a
				role='button'
				className='navbar-burger'
				aria-label='menu'
				aria-expanded='false'
				data-target='navbarBasicExample'
			>
				<span aria-hidden='true'></span>
				<span aria-hidden='true'></span>
				<span aria-hidden='true'></span>
			</a>
		</div>
	);
};
