<script lang="ts">
	import type { Post, User } from '@prisma/client';
	import { onMount } from 'svelte';
	import { user } from '../../appStore';
	import {fetchApi} from '../../helpers/api';
	import { queryList} from '../../helpers/queryList';
	import PostCard from '../widgets/postCard.svelte';

	let author: User = undefined;
	let posts: Post[] = [];
	let latestDate = new Date();

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
			createdAt: latestDate,
		});

		if (res.code.success) {
			let newPosts = res.payload.map((p) => {
				return { ...p, author };
			});

			posts = [...posts, ...newPosts];
			latestDate = posts[posts.length - 1].createdAt;
		} else {
			//posts = [];
		}
	};
</script>

<div class="cat-page">
	{#if author !== undefined}
		<p class="cat-title">{author.name}</p>
		{#each posts as p}
			<PostCard post={p} edit={true} />
		{/each}
		<button on:click={loadPosts}>Load more...</button>
	{/if}
</div>
