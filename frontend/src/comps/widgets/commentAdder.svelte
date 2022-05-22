<script lang="ts">
	import CommentEditor from './commentEditor.svelte';

	export let addComment: (content) => void;
	let content:string = '';

	const resetContent = ()=>{
		content = ''
	}
</script>

<div class="comment-adder">
	<CommentEditor bind:content={content} />

	<button on:click={() => {
		
		addComment(content)
		resetContent()
	}}>Add comment</button>
</div>
