<script lang="ts">
	import type { Post } from '@prisma/client';
	import {fetchApi} from '../../helpers/api';
	import { queryList} from '../../helpers/queryList';
	import PostCard from '../widgets/postCard.svelte';

	export let name: string = '';
	let currentName: string = '';
	let posts: Post[] = [];
	let latestDate = new Date();

	$: {
		if (currentName != name) {
			currentName = name;
			posts = [];
			latestDate = new Date();
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
			createdAt: latestDate,
		});
		if (res.code.success) {
			//console.log(res.payload)
			posts = [...posts, ...res.payload];
			latestDate = posts[posts.length - 1].createdAt;
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
	<button on:click={loadPosts}>Load more...</button>
</div>
