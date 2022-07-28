<script lang="ts">
	import type { Post, User } from '@prisma/client';
	import { user, showComments } from '../../../appStore';
	import { fetchApi } from '../../../helpers/api';
	import { queryList } from '../../../helpers/queryList';
	import { link, navigate } from 'svelte-routing';
	import CommentAdder from '../../widgets/comments/commentAdder.svelte';
	import CommentBox from '../../widgets/comments/commentBox.svelte';

	export let id = '';
	let articleId: string = '';
	let post: Post;

	let activeUser: User = null;
	let showCommentsBox = false;

	let onCommentOne: string = '';
	const setOnCommentOne = (value) => (onCommentOne = value);

	user.subscribe((value) => {
		activeUser = value;
		return () => (activeUser = null);
	});

	showComments.subscribe((value) => {
		showCommentsBox = value;
		return () => (showCommentsBox = false);
	});

	$: {
		if (articleId !== id) {
			articleId = id;
			showCommentsBox = false;
			showComments.set(false);
			updateArticle();
		}
	}

	const updateArticle = async () => {
		let res = await fetchApi(
			queryList.getPost,
			{
				id: articleId,
				fullPost: true,
				userId: activeUser.id || '',
				details: true,
			},
			true
		);

		if (res.code.success) post = res.payload.post;
	};

	const addComment = async (content, onCommentId = '') => {
		let res = await fetchApi(
			queryList.addComment,
			{
				userId: activeUser.id,
				postId: articleId,
				content,
				onCommentId,
			},
			true
		);

		if (res.code.success) {
			let comment = res.payload;
			if (onCommentId) {
				let parentComment = post.comments.findIndex(
					(c) => c.id === onCommentId
				);
				post.comments[parentComment].Children = [
					...post.comments[parentComment].Children,
					comment,
				];
			} else {
				post.comments = [...post.comments, comment];
			}
		}
	};
</script>

{#if post !== undefined}
	<div class="side-article-author">
		<img
			class="side-article-author-photo"
			src={post.author?.profile !== ''
				? `http://localhost:4000/api/profiles/${post.author.profile}`
				: 'https://bulma.io/images/placeholders/96x96.png'}
			alt="Placeholder image"
		/>

		<a class="side-article-author-name" href="\author\{post.authorId}" use:link>
			{post.author?.name}</a
		>
		<p>
			{post.author?.desc}
		</p>
	</div>

	<div class="post-interaction-1">
		{#if showCommentsBox}
			{#if onCommentOne == ''}
				<CommentAdder {addComment} />
			{/if}
			<CommentBox
				{addComment}
				comments={post.comments}
				setOnComment={setOnCommentOne}
				onComment={onCommentOne}
			/>
		{/if}
	</div>
{/if}
