<script lang="ts">
	import { Router, Route } from 'svelte-routing';
	import Footer from '../comps/layout/footer.svelte';
	import Header from '../comps/layout/header.svelte';
	import AdminPage from '../comps/pages/adminPage.svelte';
	import ArticlePage from '../comps/pages/articlePage.svelte';
	import AuthorPage from '../comps/pages/authorPage.svelte';
	import CatPage from '../comps/pages/catPage.svelte';
	import Home from '../comps/pages/home.svelte';
	import LoginPage from '../comps/pages/loginPage.svelte';
	import NewArticle from '../comps/pages/newArticle.svelte';
	import Search from '../comps/pages/search.svelte';
	import UserArticles from '../comps/pages/userArticles.svelte';
	import UserBookmarks from '../comps/pages/userBookmarks.svelte';
	import UserProfile from '../comps/pages/userProfile.svelte';
	export let url = '';
</script>

<Router {url}>
	<Header />

	<div class="main-box">
		<div class="route-page">
			<Route path="/"><Home /></Route>
			<Route path="login"><LoginPage /></Route>
			<Route path="login/:id" let:params><LoginPage id={params.id} /></Route>
			<Route path="cat/:name" let:params><CatPage name={params.name} /></Route>
			<Route path="article/:id" let:params><ArticlePage id={params.id} /></Route
			>
			<Route path="newArticle" let:params><NewArticle /></Route>
			<Route path="newArticle/:id" let:params
				><NewArticle id={params.id} /></Route
			>
			<Route path="userArticles" let:params><UserArticles /></Route>
			<Route path="author/:id" let:params><AuthorPage id={params.id} /></Route>
			<Route path="search/:term" let:params><Search term={params.term} /></Route
			>
			<Route path="userBookmarks"><UserBookmarks /></Route>
			<Route path="userProfile"><UserProfile /></Route>
			<Route path="admin"><AdminPage /></Route>
		</div>
		<!--
		<div class="side-bar">
			<Sidebar />
		</div>-->
	</div>

	<Footer />
</Router>
