<script>
	import { quill } from 'svelte-quill';

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
		placeholder: 'Write something from outside...',
	};

	export let onchange;
</script>

<svelte:head>
	<link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
</svelte:head>

<main>
	<div
		class="editor"
		use:quill={options}
		on:text-change={(e) => onchange(e.detail.html)}
	/>

	<!--{@html content.html}!-->
</main>
