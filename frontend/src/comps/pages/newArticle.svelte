<script lang="ts">
	import type { Post, Category } from '@prisma/client';

	import { user } from '../../appStore';
	import Editor from '../widgets/editor.svelte';

	import { onMount } from 'svelte';
	import fetchApi from '../../helpers/api';
	import queryList from '../../helpers/queryList';

	let content: string = '';
	let loadedCats: Category[] = [];

	let newPost: Post = {
		title: '',
		authorId: '',
		content: '',
		categoryId: '',
		createdAt: new Date(),
		featured: false,
		published: false,
		id: '',
	};

	let autosaved = false;

	user.subscribe((value) => {
		newPost.authorId = value.id;
		return () => {
			newPost.authorId = '';
		};
	});

	onMount(async () => {
		let res = await fetchApi(queryList.allCategories, {});
		if (res.success) {
			loadedCats = res.payload;
			newPost.categoryId = res[0].id;
		}

		let autosave = setInterval(() => {
			if (content !== newPost.content) {
				savePost();

				setTimeout(() => {
					autosaved = false;
				}, 2000);
			}
		}, 10000);

		return () => {
			clearInterval(autosave);
		};
	});

	const savePost = async () => {
		newPost.content = content;
		newPost.createdAt = new Date();

		let res = await fetchApi(
			newPost.id === '' ? queryList.createPost : queryList.updatePost,
			{
				postData: { ...newPost },
			}
		);

		if (res.success) {
			autosaved = true;
			if (newPost.id == '') {
				newPost.id = res.payload;
			}
		}

		/*
        articles.add({
            id: Math.floor( Math.random()*100).toString(), author: activeUser, content:content.html, title:"blabla", date:new Date()
        })
        */
	};

	const sendReview = async () => {
		await savePost();
	};
</script>

<main>
	<slot>
		<p>{autosaved ? 'Article autosaved' : ''}</p>
	</slot>
	<input
		type="text"
		placeholder="Title..."
		on:change={(e) => (newPost.title = e.currentTarget.value)}
	/>
	<div class="select">
		<select on:change={(e) => (newPost.categoryId = e.currentTarget.value)}>
			{#each loadedCats as c}
				<option value={c.id}>{c.name}</option>
			{/each}
		</select>
	</div>
	<Editor onchange={(value) => (content = value)} />
	<button on:click={savePost}>Save Draft</button>
	<button on:click={sendReview}>Send For Review</button>
</main>
