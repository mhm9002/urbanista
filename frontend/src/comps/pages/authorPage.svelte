<script lang="ts">
	import type { Post, User } from '@prisma/client';
	import { onMount } from 'svelte';
	import {fetchApi} from '../../helpers/api';
	import { queryList} from '../../helpers/queryList';
	import PostCard from '../widgets/postCard.svelte';

	export let id: string = '';
	let currentId: string = '';
	let author: User;
	let posts: Post[] = [];
	let latestDate = new Date();

	$: {
		if (currentId != id) {
			currentId = id;

			getAuthorDetails().then((res) => {
				posts = [];
				latestDate = new Date();
				loadPosts();
			});
		}
	}

	onMount(() => {});

	const getAuthorDetails = async () => {
		let res = await fetchApi(queryList.getUser, { id });

		if (res.code.success) {
			author = res.payload;
		} else {
		}
	};

	const loadPosts = async () => {
		let res = await fetchApi(queryList.postByAuthor, {
			id,
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
	<p class="cat-title">{id}</p>
	{#each posts as p}
		<PostCard post={p} />
	{/each}
	<button on:click={loadPosts}>Load more...</button>
</div>
