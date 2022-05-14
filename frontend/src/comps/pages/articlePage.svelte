<script lang="ts">
	import type { Post } from '@prisma/client';

	import fetchApi from '../../helpers/api';
	import queryList from '../../helpers/queryList';

	export let id: string = '';
	let articleId: string = '';
	let post: Post;
	let content: string;
	let loaded: boolean = false;

	$: {
		if (articleId !== id) {
			articleId = id;
			updateArticle();
		}
	}

	const updateArticle = async () => {
		let res = await fetchApi(queryList.getPost, {
			id: articleId,
			fullPost: true,
		});

		if (res.success) {
			loaded = true;
			post = res.payload;
		}
	};
</script>

<main>
	{#if loaded}
		<p class="title is-4">{post.title}</p>
		<p class="subtitle is-6">{post.author.name}</p>
		<p class="subtitle is-6">{new Date(post.createdAt).toDateString()}</p>
		<div class="articleThing">
			{@html post.content}
		</div>
	{:else}
		<p>Loading</p>
	{/if}
</main>

<style>
	div.articleThing h1 {
		font-size: 16px !important;
		font-weight: bold !important;
	}
	div.articleThing h2 {
		font-size: 14px !important;
	}
</style>
