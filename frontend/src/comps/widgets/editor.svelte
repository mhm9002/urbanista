<script lang="ts">
	import Quill, { QuillOptionsStatic } from 'quill';
	import ImageUploader from 'quill-image-uploader'
	import {uploadApi} from '../../helpers/api'
	import { onMount } from 'svelte';
import { uploadQueryList} from '../../helpers/queryList';


	export let onchange;

	Quill.register("modules/imageUploader",ImageUploader)

	let editor;
	let quill:Quill;


	//let Delta = Quill.import('delta')
	//let change = new Delta();
	
	let options: QuillOptionsStatic = {
		modules: {
			toolbar: [
				[{ header: 1 }, { header: 2 }, 'blockquote', 'link', 'image', 'video'],
				['bold', 'italic', 'underline', 'strike'],
				[{ list: 'ordered' }, { list: 'ordered' }],
				[{ align: [] }],
				['clean'],
			],
			imageUploader: {
				upload: (file:File)=>uploadApi(uploadQueryList.uploadImage, file)
										
				
				
			}
		},
		theme: 'snow',
		placeholder: 'Write something from outside...',
	};

	onMount(async () => {
		
		quill = new Quill(editor, options);
		
		let changeHandler= (delta)=>{
			//change = change.compose(delta)	
			
			//onchange(quill.getContents(),quill.getText(0,300))
			onchange(quill.root.innerHTML, quill.getText(0,300))
		}

		quill.on('text-change', changeHandler)

		return (()=>{quill.off('text-change',changeHandler)})
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.quilljs.com/1.3.6/quill.snow.css" />
</svelte:head>

<div
	class="editor article-editor"
	bind:this={editor}
	
/>
