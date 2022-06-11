<script lang="ts">
	import type { Post } from '@prisma/client';
	import moment from 'moment';
	import { link, navigate } from 'svelte-routing';

	export let post: Post;
	export let editable: boolean = false;
</script>

<div class="post-card">
	<div class="post-card-meta">
		<img
			class="profile-inline"
			src={post.author?.profile !== ''
				? `http://192.168.8.187:4000/api/profiles/${post.author.profile}`
				: 'https://bulma.io/images/placeholders/96x96.png'}
			alt="Placeholder image"
		/>

		<a class="post-card-author" href="\author\{post.authorId}" use:link>
			{post.author.name}</a
		>

		<a class="post-card-author" href="\cat\{post.category.name}" use:link
			>{post.category.name}</a
		>

		<time class="post-card-time" datetime={new Date(post.createdAt)}
			>{moment(new Date(post.createdAt), false).fromNow()}</time
		>

		{#if post.featured}
			<img src="/assets/like.svg" alt="" width="16" height="16" />
		{/if}
	</div>
	<div class="flex flex-row">
		<div class="media-left">
			<a class="post-card-title" href="/article/{post.id}" use:link
				>{post.title}</a
			>
			<p class="post-card-content">{post.exerpt}</p>
			{#if editable}
				<button on:click={() => navigate(`/newArticle/${post.id}`)}>Edit</button
				>
			{/if}
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
