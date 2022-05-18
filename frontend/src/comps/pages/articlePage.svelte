<script lang="ts">
	import type { Post } from '@prisma/client';

	import { fetchApi } from '../../helpers/api';
	import { queryList } from '../../helpers/queryList';
	import LoadingWrapper from '../widgets/loadingWrapper.svelte';

	export let id: string = '';
	let articleId: string = '';
	let post: Post;

	let liked = false;
	let loaded: boolean = false;
	let loginRequired: boolean = false;

	$: {
		if (articleId !== id) {
			articleId = id;
			updateArticle();
		}
	}

	const updateArticle = async () => {
		let res = await fetchApi(
			queryList.getPost,
			{
				id: articleId,
				fullPost: true,
			},
			true
		);

		if (res.code.success) {
			post = res.payload;
		} else if (res.code.code === 998) {
			loginRequired = true;
		}
		loaded = true;
	};
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/icon?family=Material+Icons"
	/><link
		rel="stylesheet"
		href="https://fonts.googleapis.com/icon?family=Material+Icons"
	/>
</svelte:head>

{#if loginRequired}
	<LoadingWrapper
		message={`Don't have an account. Please sign up to enjoy Urbanista articles`}
	/>
{:else if !loaded}
	<LoadingWrapper message="Loading" />
{:else}
	<section class="post">
		<div class="inline-flex mb-1 justify-between items-baseline w-full">
			<p class="post-author">{post.author.name}</p>
			<div class="inline-flex">
				{#each post.keywords as k}
					<p class="keyword">{k.name}</p>
				{/each}
			</div>
			<p class="post-date">{new Date(post.createdAt).toDateString()}</p>
		</div>
		<p class="post-title">{post.title}</p>
		<div class="post-content">
			{@html post.content}
		</div>
		<div class="post-interaction">
			<div class="post-interaction-left">
				<span class="action-clickable">
					<i class="material-icons">chat_bubble</i>
				</span>
				<span
					on:click={() => (liked = !liked)}
					class="action-clickable {liked ? 'action-active' : ''}"
				>
					<i class="material-icons">favorite</i>
				</span>
			</div>
			<div class="post-interaction-right">
				<span class="action-clickable">
					<i class="material-icons">book</i>
				</span>

				<span class="action-clickable">
					<i class="material-icons">flag</i>
				</span>
			</div>
		</div>
	</section>
{/if}

<style>
	div.articleThing h1 {
		font-size: 16px !important;
		font-weight: bold !important;
	}
	div.articleThing h2 {
		font-size: 14px !important;
	}
</style>
