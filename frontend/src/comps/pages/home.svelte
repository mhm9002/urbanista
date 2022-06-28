<script lang="ts">
	import type { Category } from '@prisma/client';

	import { onMount } from 'svelte';
	import {fetchApi} from '../../helpers/api';
	import { queryList} from '../../helpers/queryList';
	import FeaturedPostPanel from '../widgets/posts/featuredPostPanel.svelte';
import FeaturedPosts from '../widgets/posts/featuredPosts.svelte';

	let options = {
		createdAt: new Date(),
		published: true,
		featured: true,
	};

	let featuredPosts = []

	onMount(async () => {
	
		
		fetchApi(queryList.getFeaturedPosts, {
			options,
		},false).then((res) => {
			if (res.code.success) {
				featuredPosts = res.payload;
			} else {
				console.log(res.code)
			}
		});
		

		return () => {};
	});
</script>

<div class="cat-page">
	<FeaturedPosts posts={featuredPosts} />

</div>
