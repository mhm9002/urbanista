<script lang="ts">
	import type { Post } from '@prisma/client';
	import { link } from 'svelte-routing';

	export let post: Post;
	export let edit: boolean = false;

	let keywords = ['Urban planning', 'Urban design', 'Keywording'];
</script>

<div class="post-card">
	<div class="media-left">
		<div class="inline">
			<a
				class="inline post-card-author"
				href="\author\{post.authorId}"
				use:link
			>
				<img
					class="profile-inline"
					src="https://bulma.io/images/placeholders/96x96.png"
					alt="Placeholder image"
				/>

				{post.author.name}</a
			>
			in
			<a class="post-card-author" href="\cat\{post.category.name}" use:link
				>{post.category.name}</a
			>
			-
			<time
				class="post-card-time"
				datetime={new Date(post.createdAt).toDateString()}
				>{new Date(post.createdAt).toDateString()}</time
			>
		</div>

		<a class="post-card-title" href="/article/{post.id}" use:link
			>{post.title}</a
		>
		<p class="post-card-content">{post.exerpt}</p>
		<div class="media-bar">
			{#each keywords as k}
				<a href="#" class="keyword">{k}</a>
			{/each}
			<p class="reading-time">2 min. read</p>
		</div>
	</div>
	<div class="media-content">
		<figure>
			<img
				src="https://bulma.io/images/placeholders/96x96.png"
				alt="Placeholder image"
			/>
		</figure>
	</div>
	{#if edit}
		<div>
			Actions
			<a href="newArticle/{post.id}" use:link>Edit</a>
		</div>
	{/if}
</div>

<style>
	.linker:hover {
		text-decoration: none;
	}
</style>
