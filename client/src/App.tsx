import React from 'react';
import './App.css';
//import 'bulma/css/bulma.min.css';
import './custom.css';
import { AccountPage } from './components/pages/account';
import { AuthorPage } from './components/pages/author';
import { CategoryPage } from './components/pages/category';
import { HomePage } from './components/pages/home';
import { PostPage } from './components/pages/post';
import { ProfilePage } from './components/pages/profile';
import { Footer } from './components/parts/footer';
import { Header } from './components/parts/header';
import { useGlobalState, pages } from './helpers/state';

const App: React.FC = () => {
	const [activePage, seçtActivePage] = useGlobalState('activePage');

	const checkPage = () => {
		switch (activePage) {
			case pages.account:
				return <AccountPage />;
			case pages.author:
				return <AuthorPage author={{ name: 'Mohammad Najjar' }} />;
			case pages.categories:
				return <CategoryPage category={{ name: 'Architecture' }} />;
			case pages.home:
				return <HomePage />;
			case pages.post:
				return <PostPage post={{ name: 'PostName' }} />;
			case pages.profile:
				return <ProfilePage user={{ name: 'Mohammad Najjar' }} />;
		}
	};

	return (
		<div>
			<Header
				activeUser={{ name: 'Mohammad Najjar' }}
				categories={['Urban Planning', 'Architecture']}
			/>

			{checkPage()}
			<Footer />
		</div>
	);
};

export default App;
