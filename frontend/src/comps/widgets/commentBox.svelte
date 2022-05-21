<script lang="ts">
	import CommentAdder from './commentAdder.svelte';
	import CommentCard from './commentCard.svelte';
	import type { Comment } from '@prisma/client';

	export let comments: Comment[] = [];
	export let addComment: (content, onCommentId?) => void;
	export let setOnComment: (commentId) => void;
	export let onComment: string = '';
</script>

<div class="comment-box">
	{#each comments as comment}
		<CommentCard
			{comment}
			addComment={(content) => addComment(content, comment.id)}
			adderNeeded={true}
			{setOnComment}
			{onComment}
		/>
	{/each}
</div>
