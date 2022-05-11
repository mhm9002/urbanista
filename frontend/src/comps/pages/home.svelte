<script lang="ts">
	import type { Category } from '@prisma/client';

	import { onMount } from 'svelte';
	import { cats } from '../../appStore';
	import fetchApi from '../../helpers/api';
	import queryList from '../../helpers/queryList';

	let loadedCats: Category[];

	cats.subscribe((value) => (loadedCats = value));

	onMount(async () => {
		console.log('ssss');
		let res = await fetchApi(queryList.allCategories, {});
		cats.load(res);
		console.log(res);

		return () => {};
	});
</script>

<main>
	{#each loadedCats as c}
		{c.name}
	{/each}
</main>
