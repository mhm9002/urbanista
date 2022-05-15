<script lang="ts">
	import type { Post, Category } from '@prisma/client';

	import { user } from '../../appStore';
	import Editor from '../widgets/editor.svelte';

	import { onMount } from 'svelte';
	import fetchApi from '../../helpers/api';
	import queryList from '../../helpers/queryList';
import FormField from '../widgets/formField.svelte';
import { navigate } from 'svelte-routing';
import LoadingWrapper from '../widgets/loadingWrapper.svelte';

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
	let loading = false;

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
			newPost.categoryId = res.payload[0].id;
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
		loading = true
		await savePost();
		navigate('/');
	};
</script>

<main class="new-article-page">
	
	<slot>
		<p>{autosaved ? 'Article autosaved' : '_'}</p>
	</slot>
	<FormField onValueChange={(value)=>newPost.title=value} placeholder="Title..." type="text" />
	<div class="select">
		<select on:change={(e) => (newPost.categoryId = e.currentTarget.value)}>
			{#each loadedCats as c}
				<option value={c.id}>{c.name}</option>
			{/each}
		</select>
	</div>
	
	<Editor onchange={(value) => (content = value)} />
	
	<div class="field is-grouped">
		<div class="control">
			<button on:click={savePost}>Save Draft</button>
			<button on:click={sendReview}>Send For Review</button>
		</div>
	</div>
	
	{#if loading}
		<LoadingWrapper />
	{/if}
</main>
