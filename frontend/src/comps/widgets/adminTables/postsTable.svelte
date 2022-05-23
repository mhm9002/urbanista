<script lang="ts">
	import type { Category, Post } from '@prisma/client';
	import moment from 'moment';
	import { fetchApi } from '../../../helpers/api';
	import { queryList } from '../../../helpers/queryList';

	export let posts: Post[] = [];
	export let categories: Category[] = [];

	const publishPost = async (postId) => {
		let res = await fetchApi(queryList.publishPost, { id: postId }, true);

		if (res.code.success) {
			posts.find((p) => p.id === postId)['published'] = true;
			posts = posts;
		}
	};

	const feature = async (postId) => {
		let res = await fetchApi(queryList.featurePost, { id: postId }, true);

		if (res.code.success) {
			posts.find((p) => p.id === postId).featured = true;
			posts.find((p) => p.id === postId).featuredOn = new Date();

			posts = posts;
		}
	};

	const deletePost = async (postId) => {
		let res = await fetchApi(queryList.removePost, { id: postId }, true);

		if (res.code.success) {
			posts = posts.filter((p) => p.id !== postId);
		}
	};
</script>

<table class="basic-table">
	<thead>
		<tr>
			<th>Title</th>
			<th>Author</th>
			<th>Category</th>
			<th>Published</th>
			<th>Date Published</th>
			<th>Featured</th>
			<th>Likes</th>
			<th>Comments</th>
			<th>Actions</th>
		</tr>
	</thead>
	<tbody>
		{#each posts as c}
			<tr>
				<td>{c.title}</td>
				<td>{c.author.name}</td>
				<td>{categories.find((cat) => cat.id === c.categoryId)?.name}</td>
				<td>{c.published}</td>
				<td>{moment(c.createdAt).fromNow()}</td>
				<td>{moment(c.featuredOn).fromNow()}</td>
				<td>{c._count.likes}</td>
				<td>{c._count.comments}</td>
				<td>
					{#if !c.published}
						<button on:click={() => publishPost(c.id)}>Publish</button>
					{/if}
					<button on:click={() => feature(c.id)}>Feature</button>

					<button on:click={() => deletePost(c.id)}>Delete</button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
