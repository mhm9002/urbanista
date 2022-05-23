<script lang="ts">
	import type { Post, User } from '@prisma/client';
	import { onMount } from 'svelte';
	import { user } from '../../appStore';
	import type { postReqOptions } from '../../commonTypes';
	import { fetchApi } from '../../helpers/api';
	import { queryList } from '../../helpers/queryList';
	import LoadMore from '../widgets/loadMore.svelte';
	import PostCard from '../widgets/posts/postCard.svelte';

	let author: User = undefined;
	let posts: Post[] = [];
	let allPostsLoaded = false;

	let options: postReqOptions = {
		createdAt: new Date(),
		published: false,
	};

	user.subscribe((value) => {
		author = value;

		//getAuthorDetails()
		return () => {
			author = undefined;
		};
	});

	onMount(() => {
		if (author !== undefined) loadPosts();
	});

	/*
    const getAuthorDetails = async () => {
		let res = await fetchApi(queryList.getUser, { id: author.id });

		if (res.code.success) {
			author = res.payload;
		}
	};
    */

	const loadPosts = async () => {
		let res = await fetchApi(queryList.postByAuthor, {
			id: author.id,
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
	{#if author !== undefined}
		<p class="cat-title">{author.name}</p>
		{#each posts as p}
			<PostCard post={p} />
		{/each}
		{#if !allPostsLoaded}
			<LoadMore load={loadPosts} />
		{/if}
	{/if}
</div>
