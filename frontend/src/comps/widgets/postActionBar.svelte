<script lang="ts">
	import { fetchApi } from '../../helpers/api';
	import { queryList } from '../../helpers/queryList';
	import CommentAdder from './commentAdder.svelte';
	import CommentBox from './commentBox.svelte';

	export let userId: string = '';
	export let articleId: string = '';
	export let liked: boolean;
	export let bookmarked: boolean;
	export let comments: Comment[] = [];

	let liking = false;
	let bookmarking = false;
	let onCommentOne: string = '';

	const setOnCommentOne = (value) => (onCommentOne = value);

	let showComments = false;

	const bookmarkPost = async () => {
		if (bookmarking) return;

		bookmarking = true;
		let res = await fetchApi(
			queryList.bookmarkPost,
			{ postId: articleId, userId },
			true
		);

		if (res.code.success) {
			//toggled bookmark
			bookmarked = res.code.code !== 251;
			console.log(res.code);
		} else {
			console.log(res.code.message);
		}

		bookmarking = false;
	};

	const likePost = async () => {
		if (liking) return;

		liking = true;
		let res = await fetchApi(
			queryList.likePost,
			{ postId: articleId, userId },
			true
		);

		if (res.code.success) {
			//toggled bookmark
			liked = res.code.code !== 271;
			console.log(res.code);
		} else {
			console.log(res.code.message);
		}

		liking = false;
	};

	const addComment = async (content, onCommentId = '') => {
		let res = await fetchApi(
			queryList.addComment,
			{
				userId,
				postId: articleId,
				content,
				onCommentId,
			},
			true
		);

		if (res.code.success) {
			let comment = res.payload;
			if (onCommentId) {
				let parentComment = comments.findIndex((c) => c.id === onCommentId);
				comments[parentComment].Children = [
					...comments[parentComment].Children,
					comment,
				];
			} else {
				comments = [...comments, comment];
			}
		}
	};
</script>

<div class="post-interaction">
	<div class="post-interaction-1">
		<div class="post-interaction-2">
			<button
				on:click={() => (showComments = !showComments)}
				class="action-clickable"
			>
				<i class="material-icons">chat_bubble</i>
			</button>
			<button
				on:click={likePost}
				disabled={liking}
				class="action-clickable {liked ? 'action-active' : ''}"
			>
				<i class="material-icons">favorite</i>
			</button>
		</div>
		<div class="post-interaction-2">
			<button
				on:click={bookmarkPost}
				disabled={bookmarking}
				class="action-clickable {bookmarked ? 'action-active' : ''}"
			>
				<i class="material-icons">book</i>
			</button>

			<button class="action-clickable">
				<i class="material-icons">flag</i>
			</button>
		</div>
	</div>
	<div class="post-interaction-1">
		{#if showComments}
			{#if onCommentOne == ''}
				<CommentAdder {addComment} />
			{/if}
			<CommentBox
				{addComment}
				{comments}
				setOnComment={setOnCommentOne}
				onComment={onCommentOne}
			/>
		{/if}
	</div>
</div>
