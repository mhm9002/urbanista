<script>
	import { quill } from 'svelte-quill'
	
	let options = { 
        modules: {
			toolbar: [
				[{ header: 1 }, { header: 2 }, "blockquote", "link", "image", "video"],
				["bold", "italic", "underline", "strike"],
				[{ list: "ordered" }, { list: "ordered" }],
				[{ align: [] }],
				["clean"]
			]
  		},
        placeholder: "Write something from outside...", }
    
	export let content = { html: '', text: ''};
	export let onchange;

	const contentChanged = (e)=>{
		content = e.detail
		onchange(e.detail)
	}
	
</script>

<svelte:head>
	<link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
</svelte:head>

<main>
  <div class="editor" use:quill={options} on:text-change={contentChanged}/>
	
	<!--{@html content.html}!-->
</main>