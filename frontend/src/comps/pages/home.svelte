<script lang="ts">
	import type { Category } from '@prisma/client';

	import { onMount } from 'svelte';
	import fetchApi from '../../helpers/api';
	import queryList from '../../helpers/queryList';

	let loadedCats: Category[] = [];

	onMount(async () => {
		let res = await fetchApi(queryList.allCategories, {});
		if (res.success) {
			loadedCats = res.payload;
		}

		return () => {};
	});
</script>

<main>
	{#each loadedCats as c}
		{c.name}<br />
	{/each}
</main>
