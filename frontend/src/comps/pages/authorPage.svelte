<script lang="ts">
	import type { Post, User } from '@prisma/client';
	import { onMount } from 'svelte';
	import type { postReqOptions } from '../../commonTypes';
	import { fetchApi } from '../../helpers/api';
	import { queryList } from '../../helpers/queryList';
	import LoadMore from '../widgets/loadMore.svelte';
	import PostCard from '../widgets/postCard.svelte';

	export let id: string = '';
	let currentId: string = '';
	let author: User;
	let posts: Post[] = [];
	let allPostsLoaded = false;

	let options: postReqOptions = {
		createdAt: new Date(),
		published: true,
	};

	$: {
		if (currentId != id) {
			currentId = id;

			getAuthorDetails().then((res) => {
				posts = [];
				options.createdAt = new Date();
				loadPosts();
			});
		}
	}

	onMount(() => {});

	const getAuthorDetails = async () => {
		let res = await fetchApi(queryList.getUser, { id, options });

		if (res.code.success) {
			author = res.payload;
		} else {
		}
	};

	const loadPosts = async () => {
		let res = await fetchApi(queryList.postByAuthor, {
			id,
			options,
		});

		if (res.code.success) {
			let newPosts = res.payload.map((p) => {
				return { ...p, author };
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
	<p class="cat-title">{id}</p>
	{#each posts as p}
		<PostCard post={p} />
	{/each}
	{#if !allPostsLoaded}
		<LoadMore load={loadPosts} />
	{/if}
</div>
