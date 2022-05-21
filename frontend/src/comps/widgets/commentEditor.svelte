<script lang="ts">
	import Quill, { QuillOptionsStatic, Sources } from 'quill';
	import { onMount } from 'svelte';
	import { uploadQueryList } from '../../helpers/queryList';

	export let onContentChange;

	let editor;
	let quill: Quill;

	let options: QuillOptionsStatic = {
		modules: {
			toolbar: [['link'], ['bold', 'italic', 'underline', 'strike']],
		},
		theme: 'bubble',
		placeholder: 'Write something from outside...',
	};

	onMount(async () => {
		quill = new Quill(editor, options);
		let placeholder = 'Write something from outside...';
		quill.setText(placeholder);
		quill.setSelection(0, placeholder.length, 'user');

		let changeHandler = (delta) => {
			//change = change.compose(delta)

			//onchange(quill.getContents(),quill.getText(0,300))
			onContentChange(
				quill.root.innerHTML,
				quill.getText(0, 100),
				quill.root.innerText.split(' ').length
			);
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
