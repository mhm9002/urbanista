<script lang="ts">
	import Quill, { QuillOptionsStatic } from 'quill';
	import ImageUploader from 'quill-image-uploader';
	import { uploadApi } from '../../helpers/api';
	import { onMount } from 'svelte';
	import { uploadQueryList } from '../../helpers/queryList';

	export let value;
	export let onContentChange;
	export let initialValue;

	Quill.register('modules/imageUploader', ImageUploader);

	let editor;
	let quill: Quill;

	const maxH = 400;
	const maxW = 800;

	$: initialValue,
		quill !== undefined ? (quill.root.innerHTML = initialValue) : () => {};

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
				upload: async (file: File) => {
					let res = await resizeImage(file);

					let res2 = await uploadApi(uploadQueryList.uploadImage, res);

					return res2;
				},
			},
		},
		theme: 'bubble',
		placeholder: 'Write something from outside...',
	};

	onMount(async () => {
		quill = new Quill(editor, options);

		let changeHandler = () => {
			onContentChange(quill.root.innerHTML, quill.root.innerText);
		};

		quill.on('text-change', changeHandler);

		return () => {
			quill.off('text-change', changeHandler);
		};
	});

	const resizeImage = (file: File) => {
		return new Promise((resolve, reject) => {
			var reader = new FileReader();
			reader.onload = (e) => {
				var img = document.createElement('img');
				console.log(1);
				img.onload = () => {
					if (img.width < maxW && img.height < maxH) {
						resolve(file);
					}

					let ratio = img.height / img.width;

					let w = maxW;
					let h = w * ratio;

					if (img.width < img.height) {
						h = maxH;
						w = h / ratio;
					}

					console.log(img.width, img.height, w, h);

					// Dynamically create a canvas element
					var canvas = document.createElement('canvas');
					canvas.width = w;
					canvas.height = h;
					// var canvas = document.getElementById("canvas");
					var ctx = canvas.getContext('2d');

					// Actual resizing
					ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, w, h);

					// Show resized image in preview element
					canvas.toBlob((b) => resolve(b), file.type);
				};
				img.src = e.target.result;
			};
			reader.readAsDataURL(file);
		});
	};
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.quilljs.com/1.3.6/quill.bubble.css"
	/>
</svelte:head>

<div class="editor article-editor" bind:this={editor} />
