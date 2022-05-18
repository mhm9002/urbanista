<script lang="ts">
	import type { Post } from '@prisma/client';
	import {fetchApi} from '../../helpers/api';
	import { queryList} from '../../helpers/queryList';
import LoadMore from '../widgets/loadMore.svelte';
	import PostCard from '../widgets/postCard.svelte';

	export let name: string = '';
	let currentName: string = '';
	let posts: Post[] = [];
	let latestDate = new Date();
	let allPostsLoaded = false

	$: {
		if (currentName != name) {
			currentName = name;
			posts = [];
			latestDate = new Date();
			allPostsLoaded=false;
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
			
			if (res.payload.length===0){
				allPostsLoaded =true
			}
			
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
	<LoadMore load={()=>allPostsLoaded?()=>{}:loadPosts()} />
</div>
