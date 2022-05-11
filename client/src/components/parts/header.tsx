import { BrandMenu } from '../widgets/brandMenu';
import { CategoryMenu } from '../widgets/categoryMenu';
import { LoginMenu } from '../widgets/loginMenu';

interface IHeaderProps {
	activeUser: Object;
	categories: Array<string>;
}

export const Header: React.FC<IHeaderProps> = (props) => {
	return (
		<nav className='navbar' role='navigation' aria-label='main navigation'>
			<BrandMenu />
			<div id='navbarBasicExample' className='navbar-menu'>
				<div className='navbar-start'>
					{props.categories.map((c, id) => {
						return <CategoryMenu key={id} name={c} />;
					})}
				</div>
			</div>
			<LoginMenu />
		</nav>
	);
};
