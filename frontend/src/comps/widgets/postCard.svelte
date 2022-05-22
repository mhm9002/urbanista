<script lang="ts">
	import type { Post } from '@prisma/client';
	import moment from 'moment';
	import { link } from 'svelte-routing';
	import { fetchApi } from '../../helpers/api';
	import { queryList } from '../../helpers/queryList';

	export let post: Post;
	export let edit: boolean = false;

	const publishDraft = async () => {
		let res = await fetchApi(queryList.publishPost, { id: post.id }, true);

		if (res.code.success) {
			post.published = true;
		}
	};
</script>

<div class="post-card">
	<div class="post-card-meta">
		<img
			class="profile-inline"
			src="https://bulma.io/images/placeholders/96x96.png"
			alt="Placeholder image"
		/>
		<p>
			<a class="post-card-author" href="\author\{post.authorId}" use:link>
				{post.author.name}</a
			>
			in
			<a class="post-card-author" href="\cat\{post.category.name}" use:link
				>{post.category.name}</a
			>
			-
			<time class="post-card-time" datetime={new Date(post.createdAt)}
				>{moment(new Date(post.createdAt), false).fromNow()}</time
			>
		</p>
	</div>
	<div class="flex flex-row">
		<div class="media-left">
			<a class="post-card-title" href="/article/{post.id}" use:link
				>{post.title}</a
			>
			<p class="post-card-content">{post.exerpt}</p>
		</div>
		{#if post.image !== ''}
		<div class="media-content">
			<figure>
				<img
					class="post-card-image" 
					src={'http://localhost:4000/api/images/' + post.image}
					alt="Placeholder image"
				/>
			</figure>
		</div>
		{/if}
		{#if edit}
			<div>
				Actions
				<a href="newArticle/{post.id}" use:link>Edit</a>
				{#if !post.published}
					<a href="#" on:click={publishDraft}>Publish</a>
				{/if}
			</div>
		{/if}
	</div>
	<div class="media-bar">
		{#each post.keywords as k}
			<a href="#" class="keyword">{k.name}</a>
		{/each}
		<p class="reading-time">{Math.ceil(post.words / 225)} min. read</p>
	</div>
</div>

<style>
	.linker:hover {
		text-decoration: none;
	}
</style>
