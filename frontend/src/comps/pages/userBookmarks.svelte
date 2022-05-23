<script lang="ts">
	import type { Post, User } from '@prisma/client';
	import { onMount } from 'svelte';
	import { user } from '../../appStore';
	import { fetchApi } from '../../helpers/api';
	import { queryList } from '../../helpers/queryList';
	import PostCard from '../widgets/posts/postCard.svelte';

	let userValue: User = undefined;
	let posts: Post[] = [];

	user.subscribe((value) => {
		userValue = value;

		//getAuthorDetails()
		return () => {
			userValue = undefined;
		};
	});

	onMount(() => {
		if (userValue !== undefined) loadPosts();
	});

	const loadPosts = async () => {
		let res = await fetchApi(
			queryList.userBookmarks,
			{
				id: userValue.id,
			},
			true
		);

		if (res.code.success) {
			posts = res.payload;
		}
	};
</script>

<div class="cat-page">
	{#if userValue !== undefined}
		<p class="cat-title">{userValue.name}</p>
		{#each posts as p}
			<PostCard post={p} />
		{/each}
	{/if}
</div>
