<script lang="ts">
	import type { Post } from '@prisma/client';

	import fetchApi from '../../helpers/api';
	import queryList from '../../helpers/queryList';

	export let id: string = '';
	let articleId: string = '';
	let post: Post;

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

<section class="post">
	{#if loaded}
		<p class="post-title">{post.title}</p>
		<p class="post-author">{post.author.name}</p>
		<div class="inline">
			{#each post.keywords as k}
				<p>{k.name}</p>
			{/each}
		</div>
		<p class="post-date">{new Date(post.createdAt).toDateString()}</p>
		<div class="post-content">
			{@html post.content}
		</div>
	{:else}
		<p>Loading</p>
	{/if}
</section>

<style>
	div.articleThing h1 {
		font-size: 16px !important;
		font-weight: bold !important;
	}
	div.articleThing h2 {
		font-size: 14px !important;
	}
</style>
