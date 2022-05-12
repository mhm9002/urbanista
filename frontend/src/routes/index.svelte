<script lang="ts">
	import { Router, Route } from 'svelte-routing';
	import Footer from '../comps/layout/footer.svelte';
	import Header from '../comps/layout/header.svelte';
	import ArticlePage from '../comps/pages/articlePage.svelte';
	import CatPage from '../comps/pages/catPage.svelte';
	import Home from '../comps/pages/home.svelte';
import LoginPage from '../comps/pages/loginPage.svelte';
import NewArticle from '../comps/pages/newArticle.svelte';
	export let url = '';
</script>

<Router {url}>
	<Header />
	<Route path="/"><Home /></Route>
	<Route path="login"><LoginPage /></Route>
	<Route path="cat/:name" let:params><CatPage name={params.name} /></Route>
	<Route path="article/:id" let:params><ArticlePage id={params.id} /></Route>
	<Route path="newArticle" let:params><NewArticle /></Route>
	<Footer />
</Router>
