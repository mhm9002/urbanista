<script lang="ts">
	import type { Comment } from '@prisma/client';
	import CommentAdder from './commentAdder.svelte';
	import CommentBox from './commentBox.svelte';

	export let comment: Comment = null;
	export let addComment;
	export let adderNeeded: boolean = true;
	export let setOnComment: (commentId: string) => void;
	export let onComment: string = '';

	let showChildren = false;
</script>

{#if comment !== null}
	<div class="comment-card">
		<div class="comment-card-media">
			<img
				class="profile-inline"
				src="https://bulma.io/images/placeholders/96x96.png"
				alt="Placeholder image"
			/>
			<div class="comment-card-user">
				{comment.commenter?.name}
				<div class="comment-card-content">{@html comment.content}</div>
			</div>
		</div>

		<div class="comment-card-actions">
			<button
				class="w-fit text-xs"
				on:click={() => {
					showChildren = !showChildren;
					if (showChildren) {
						setOnComment(comment.id);
					} else {
						setOnComment('');
					}
				}}>Reply</button
			>

			{#if showChildren}
				<div class="flex flex-col border-b-2">
					{#if adderNeeded === true && onComment == comment.id}
						<CommentAdder {addComment} />
					{/if}

					{#if comment.Children && comment.Children.length > 0}
						<CommentBox
							comments={comment.Children}
							{addComment}
							{setOnComment}
							{onComment}
						/>
					{/if}
				</div>
			{/if}
		</div>
	</div>
{/if}
