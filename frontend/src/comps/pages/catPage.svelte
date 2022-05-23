<script lang="ts">
	import type { Post } from '@prisma/client';
	import type { postReqOptions } from '../../commonTypes';
	import { fetchApi } from '../../helpers/api';
	import { queryList } from '../../helpers/queryList';
	import LoadMore from '../widgets/loadMore.svelte';
import PostCard from '../widgets/posts/postCard.svelte';

	export let name: string = '';
	let currentName: string = '';
	let posts: Post[] = [];
	let allPostsLoaded = false;

	let options: postReqOptions = {
		createdAt: new Date(),
		published: true,
	};

	$: {
		if (currentName != name) {
			currentName = name;
			posts = [];
			options.createdAt = new Date();
			allPostsLoaded = false;
			loadPosts();
		}
	}
	/*
	onMount(() => {
		loadPosts();
	});
	*/
	const loadPosts = async () => {
		let res = await fetchApi(queryList.postByCategoryName, {
			name,
			options,
		});
		if (res.code.success) {
			if (res.payload.length === 0) {
				allPostsLoaded = true;
			} else {
				posts = [...posts, ...res.payload];
				options.createdAt = posts[posts.length - 1].createdAt;
			}
		} else {
			//posts = [];
		}
	};
</script>

<div class="cat-page">
	<h1 class="cat-title">{name}</h1>
	{#each posts as p}
		<PostCard post={p} />
	{/each}
	{#if !allPostsLoaded}
		<LoadMore load={loadPosts} />
	{/if}
</div>
