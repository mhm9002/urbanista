<script lang="ts">
	import type { Post } from '@prisma/client';
	import { link } from 'svelte-routing';

	export let post: Post;
</script>

<main>
	<div class="card">
		<div class="card-content">
			<div class="media">
				<div class="media-left">
					<figure class="image is-128x128">
						<img
							src="https://bulma.io/images/placeholders/96x96.png"
							alt="Placeholder image"
						/>
					</figure>
				</div>
				<div class="media-content" style="text-align: left">
					<div class="content">
						<a href="post/{post.id}" use:link class="linker"
							><a href="/article/{post.id}" use:link class="title is-4"
								>{post.title}</a
							></a
						>
						<p>{post.content.substring(0, 300)}</p>
						<a class="subtitle is-6" href="\author\{post.authorId}" use:link
							>{post.author.name}</a
						>

						<time datetime={new Date(post.createdAt).toDateString()}
							>{new Date(post.createdAt).toDateString()}</time
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	.linker:hover {
		text-decoration: none;
	}
</style>
