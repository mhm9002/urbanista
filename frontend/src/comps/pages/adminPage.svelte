<script lang="ts">
	import type { Category, Post, User } from '@prisma/client';
	import { onMount } from 'svelte';
	import { fetchApi } from '../../helpers/api';
	import { queryList } from '../../helpers/queryList';
	import CategoriesTable from '../widgets/adminTables/categoriesTable.svelte';
	import PostsTable from '../widgets/adminTables/postsTable.svelte';
	import UsersTable from '../widgets/adminTables/usersTable.svelte';

	let categories: Category[] = [];
	let users: User[] = [];
	let posts: Post[] = [];

	let loading = false;

	onMount(async () => {
		let res = await fetchApi(queryList.allCategories, {});

		if (res.code.success) {
			categories = res.payload;
		}

		res = await fetchApi(queryList.allUsers, {}, true);

		if (res.code.success) {
			users = res.payload;
		}

		res = await fetchApi(queryList.allPost, {}, true);

		if (res.code.success) {
			posts = res.payload;
		}

		return () => {
			categories = [];
			users = [];
			posts = [];
		};
	});

	const updateSearchTerms = async ()=>{
		loading = true
		console.log(await fetchApi(queryList.refillTerms,{}))
		
		loading = false
	}
</script>

<div class="post">
	<CategoriesTable {categories} />
	<UsersTable {users} />
	<PostsTable {posts} {categories} />
	<button on:click={updateSearchTerms} disabled={loading} >Update search terms</button>
</div>
