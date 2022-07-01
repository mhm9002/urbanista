<script lang="ts">

	import { Router, Route } from 'svelte-routing';
	import Page from '../comps/layout/page.svelte';
	import AdminPage from '../comps/pages/adminPage.svelte';
	import ArticlePage from '../comps/pages/articlePage.svelte';
	import AuthorPage from '../comps/pages/authorPage.svelte';
	import CatPage from '../comps/pages/catPage.svelte';
	import Home from '../comps/pages/home.svelte';
	import LoginPage from '../comps/pages/loginPage.svelte';
	import NewArticle from '../comps/pages/newArticle.svelte';
	import Search from '../comps/pages/search.svelte';
	import SideArticle from '../comps/pages/sidebars/sideArticle.svelte';
	import SideHome from '../comps/pages/sidebars/sideHome.svelte';
	import SideList from '../comps/pages/sidebars/sideList.svelte';
	import UserArticles from '../comps/pages/userArticles.svelte';
	import UserBookmarks from '../comps/pages/userBookmarks.svelte';
	import UserProfile from '../comps/pages/userProfile.svelte';
	export let url = '';
	
</script>

<Router {url}>
	
	<Route path="/"><Page><Home slot='component' /><SideHome slot='sidebar' /></Page></Route>
	<Route path="login"><Page header={false} sidebar={false}><LoginPage  slot='component' /></Page></Route>
	<Route path="login/:id" let:params><Page  header={false} sidebar={false}><LoginPage  slot='component' id={params.id} /></Page></Route>
	<Route path="cat/:name" let:params><Page><CatPage  slot='component' name={params.name} /><SideList slot='sidebar' /></Page></Route>
	<Route path="article/:id" let:params><Page><ArticlePage  slot='component' id={params.id} /><SideArticle id={params.id} slot='sidebar' /></Page></Route
	>
	<Route path="newArticle" let:params><Page sidebar={false}><NewArticle  slot='component' /></Page></Route>
	<Route path="newArticle/:id" let:params
		><Page sidebar={false}><NewArticle  slot='component' id={params.id} /></Page></Route
	>
	<Route path="userArticles" let:params><Page><UserArticles  slot='component' /><SideList slot='sidebar' /></Page></Route>
	<Route path="author/:id" let:params><Page><AuthorPage  slot='component' id={params.id} /><SideList slot='sidebar' /></Page></Route>
	<Route path="search/:term" let:params><Page><Search  slot='component' term={params.term} /><SideList slot='sidebar' /></Page></Route
	>
	<Route path="userBookmarks"><Page><UserBookmarks  slot='component' /><SideList slot='sidebar' /></Page></Route>
	<Route path="userProfile"><Page sidebar={false}><UserProfile  slot='component' /></Page></Route>
	<Route path="admin"><Page sidebar={false}><AdminPage  slot='component' /></Page></Route>

</Router>
