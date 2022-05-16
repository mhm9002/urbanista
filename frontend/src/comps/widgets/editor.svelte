<script lang="ts">
	import Quill from 'quill';
	import { onMount } from 'svelte';

	export let onchange;

	let editor;

	let options = {
		modules: {
			toolbar: [
				[{ header: 1 }, { header: 2 }, 'blockquote', 'link', 'image', 'video'],
				['bold', 'italic', 'underline', 'strike'],
				[{ list: 'ordered' }, { list: 'ordered' }],
				[{ align: [] }],
				['clean'],
			],
		},
		theme: 'snow',
		placeholder: 'Write something from outside...',
	};

	onMount(async () => {
		let quill = new Quill(editor, options);
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.quilljs.com/1.3.6/quill.snow.css" />
</svelte:head>

<div
	class="editor article-editor"
	bind:this={editor}
	on:text-change={(e) => onchange(e.detail.html)}
/>
