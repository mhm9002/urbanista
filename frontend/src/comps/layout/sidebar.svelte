<script lang="ts">
	import type { Category, Post, User } from '@prisma/client';
	import { onMount } from 'svelte';
	import fetchApi from '../../helpers/api';
	import queryList from '../../helpers/queryList';
	import Keyword from '../widgets/keyword.svelte';
	import ShortAuthorCard from '../widgets/shortAuthorCard.svelte';
	import ShortPostCard from '../widgets/shortPostCard.svelte';

	let recommendedReadings: Post[] = [];
	let cats: Category[] = [];
	let recommendedAuthors: User[] = [];

	onMount(() => {
		/*
        let res1 = fetchApi(queryList.allPost, {});
		let res2 = fetchApi(queryList.allCategories, {});
		let res3 = fetchApi(queryList.allUsers, {});

		Promise.all([res1, res2, res2]).then(([r1, r2, r3]) => {
			if (r1.success) {
				recommendedReadings = r1.payload;
			}
			if (r2.success) {
				cats = r2.payload;
			}
			if (r3.success) {
				recommendedReadings = r3.payload;
			}
		});
*/
		return () => {
			//recommendedReadings = [];
			//cats = [];
			//recommendedAuthors = [];
		};
	});
</script>

<div>
	Featured Readings
	{#each recommendedReadings as post}
		<ShortPostCard {post} />
	{/each}

	Recommended Topics
	{#each cats as c}
		<Keyword name={c.name} />
	{/each}

	Who to follow
	{#each recommendedAuthors as author}
		<ShortAuthorCard {author} />
	{/each}
</div>
