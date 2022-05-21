<script lang="ts">
	import CommentEditor from './commentEditor.svelte';

	import Editor from './editor.svelte';

	import FormField from './formField.svelte';

	export let addComment: (content) => void;
	let content = '';
</script>

<div class="comment-adder">
	<CommentEditor onContentChange={(c, e, l) => (content = c)} />

	<button on:click={() => addComment(content)}>Add comment</button>
</div>
