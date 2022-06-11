<script lang="ts">
	import type { Post } from '@prisma/client';

	import { onMount } from 'svelte';
	import type { postReqOptions } from '../../commonTypes';
	import { fetchApi } from '../../helpers/api';
	import { queryList } from '../../helpers/queryList';
	import LoadMore from '../widgets/loadMore.svelte';
	import PostCard from '../widgets/posts/postCard.svelte';

	export let term: string = '';

	let currentTerm: string = '';
	let posts: Post[] = [];
	let allPostsLoaded = false;

	let options: postReqOptions = {
		createdAt: new Date(),
		published: true,
	};

	$: {
		if (currentTerm != term) {
			currentTerm = term;
			posts = [];
			options.createdAt = new Date();
			loadPosts();
		}
	}

	onMount(() => {});

	const loadPosts = async () => {
		let res = await fetchApi(
			queryList.searchTerm,
			{
				term,
				options,
			},
			false
		);

		console.log(1);

		if (res.code.success) {
			let newPosts = res.payload.map((p) => {
				return { ...p };
			});

			if (newPosts.length === 0) {
				allPostsLoaded = true;
			} else {
				posts = [...posts, ...newPosts];
				options.createdAt = posts[posts.length - 1].createdAt;
			}
		} else {
			//posts = [];
		}
	};
</script>

<div class="cat-page">
	<p class="cat-title">{term}</p>
	{#each posts as p}
		<PostCard post={p} />
	{/each}
	{#if !allPostsLoaded}
		<LoadMore load={loadPosts} />
	{/if}
</div>
