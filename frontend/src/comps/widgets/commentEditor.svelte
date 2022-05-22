<script lang="ts">
	import Quill, { QuillOptionsStatic, Sources } from 'quill';
	import { onMount } from 'svelte';

	export let content: string='';

	let editor;
	let quill: Quill;

	let options: QuillOptionsStatic = {
		modules: {
			toolbar: [['link'], ['bold', 'italic', 'underline', 'strike']],
		},
		theme: 'bubble',
		placeholder: 'Write your comment here...',
	};

	onMount(async () => {
		quill = new Quill(editor, options);
		quill.setText(content)

		let changeHandler = (delta) => {
			
			content= quill.root.innerHTML;
			
		};

		quill.on('text-change', changeHandler);

		return () => {
			quill.off('text-change', changeHandler);
		};
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.quilljs.com/1.3.6/quill.bubble.css"
	/>
</svelte:head>

<div class="comment-editor" bind:this={editor} />
