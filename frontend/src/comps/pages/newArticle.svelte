<script lang="ts">
	import type { Post, Category } from '@prisma/client';

	import { user } from '../../appStore';
	import Editor from '../widgets/editor.svelte';

	import { onMount } from 'svelte';
	import { fetchApi } from '../../helpers/api';
	import { queryList } from '../../helpers/queryList';
	import FormField from '../widgets/forms/formField.svelte';
	import { navigate } from 'svelte-routing';
	import LoadingWrapper from '../widgets/loadingWrapper.svelte';
	import FormFieldSelect from '../widgets/forms/formFieldSelect.svelte';

	export let id: string = '';

	let postContent: string = '';
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
		exerpt: '',
		featuredOn: null,
		image: '',
		words: 0,
		keywords: [],
	};

	let keywords: string = '';

	let mainCategory: string = ''

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
		if (res.code.success) {
			loadedCats = res.payload;
			mainCategory = res.payload[0].id;
			newPost.categoryId = res.payload[0].id;
		}

		if (id !== '') {
			let res = await fetchApi(queryList.getPost, { id }, true);
			if (res.code.success) {
				newPost = res.payload;
				postContent = newPost.content;
			}
		}

		let autosave = setInterval(() => {
			if (postContent !== newPost.content) {
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

	const savePost = async (sendKeywords: boolean = false) => {
		newPost.content = postContent;
		newPost.createdAt = new Date();

		let imagefile = '';
		let firstImage = postContent.indexOf('api/images/');
		if (firstImage > -1) {
			let end = postContent.indexOf('"', firstImage);
			if (end > -1) {
				imagefile = postContent.substring(firstImage + 11, end);
				console.log(imagefile);
				newPost.image = imagefile;
				//console.log(imagefile)
			}
		}

		if (sendKeywords) {
			newPost.keywords = keywords.split(' ').map((k) => {
				return { name: k };
			});
		}

		if (newPost.title === '') newPost.title = 'Draft';

		let res = await fetchApi(
			newPost.id === '' ? queryList.createPost : queryList.updatePost,
			{
				postData: newPost,
			},
			true
		);

		if (res.code.success) {
			autosaved = true;
			if (newPost.id == '') {
				newPost.id = res.payload;
			}
		}

	};

	const sendReview = async () => {
		loading = true;
		await savePost(true);
		navigate('userArticles');
	};
</script>

<main class="new-article-page">
	<div class="new-article-top-bar">
		<p>{autosaved ? 'Article autosaved' : '_____________'}</p>
		<FormField
			bind:value = {newPost.title}	
			placeholder="Title..."
			type="text"
		/>
		<FormField
			bind:value={keywords}
			placeholder="Keywords... separate by whitespace"
			type="text"
		/>
		<FormFieldSelect
			bind:value={mainCategory}
			options={loadedCats.filter(c=>c.parent_id===null).map((c) => {
				return { value: c.id, name: c.name };
			})}
			
		/>
		<FormFieldSelect
			bind:value={newPost.categoryId}
			options={[
				{value:mainCategory, name:'Main'},
				...loadedCats.filter(c=>c.parent_id===mainCategory).map((c) => {
					return { value: c.id, name: c.name };
				})
			]}
			
		/>
		<div class="field is-grouped">
			<div class="control">
				<button on:click={sendReview}>Send For Review</button>
			</div>
		</div>
	</div>

	<Editor
		onContentChange={(content, exerpt, words) => {
			postContent = content;
			newPost.exerpt = exerpt;
			newPost.words = words;
		}}
	/>

	{#if loading}
		<LoadingWrapper />
	{/if}
</main>
