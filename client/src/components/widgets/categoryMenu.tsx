import { useGlobalState, pages } from '../../helpers/state';

interface ICategoryMenuProps {
	name: string;
}

export const CategoryMenu: React.FC<ICategoryMenuProps> = (props) => {
	const [activePage, setActivePage] = useGlobalState('activePage');

	const handleCategoryMenu = () => {
		setActivePage(pages.categories);
	};

	return (
		<a href='#' onClick={handleCategoryMenu} className='navbar-item'>
			{props.name}
		</a>
	);
};
