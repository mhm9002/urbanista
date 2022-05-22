<script lang="ts">
	import type { User } from '@prisma/client';
	import { user } from '../../appStore';
	import { uploadApi } from '../../helpers/api';
	import { uploadQueryList } from '../../helpers/queryList';
	import UserProperty from '../widgets/userProperty.svelte';

	let activeUser: User;
	let profilePhoto: File;

	user.subscribe((value) => {
		activeUser = value;
		return () => {
			activeUser = null;
		};
	});

	type userProp = {
		name: string;
		description: string;
		value: any;
		editable: boolean;
	};

	let props: userProp[] = [
		{
			name: 'Name',
			description: 'This is your name visible on your articles and comments',
			value: activeUser.name,
			editable: true,
		},
		{
			name: 'Biography',
			description: 'Write a short biography about yourself',
			value: activeUser.desc,
			editable: true,
		},
		{
			name: 'Email',
			description:
				'Your email account used as the ID of Urbanista account. Currently not editable',
			value: activeUser.email,
			editable: false,
		},
		{
			name: 'Username',
			description: 'This is for test',
			value: activeUser.id,
			editable: true,
		},
		{
			name: 'Password',
			description: 'Change your password',
			value: activeUser.password,
			editable: true,
		},
	];

	const changeFile = async (e) => {
		let file = e.target.files[0];
		let res = await resizeImage(file);

		console.log(res);
		let res2 = await uploadApi(uploadQueryList.uploadProfile, res);
		return res2;
	};

	const resizeImage = (file: File) => {
		return new Promise((resolve, reject) => {
			var reader = new FileReader();
			reader.onload = (e) => {
				var img = document.createElement('img');
				img.onload = () => {
					let ratio = img.height / img.width;

					let sx = 0;
					let sy = 0;
					let ex = img.width;
					let ey = img.height;

					if (ratio > 1) {
						sy = (img.height - img.width) / 2;
						ey = sy + img.width;
					} else {
						sx = (img.width - img.height) / 2;
						ex = sx + img.height;
					}

					// Dynamically create a canvas element
					var canvas = document.createElement('canvas');
					canvas.width = 128;
					canvas.height = 128;
					// var canvas = document.getElementById("canvas");
					var ctx = canvas.getContext('2d');

					// Actual resizing
					ctx.drawImage(img, sx, sy, ex, ey, 0, 0, 128, 128);

					// Show resized image in preview element
					canvas.toBlob((b) => resolve(b), file.type);
				};
				img.src = e.target.result;
			};
			reader.readAsDataURL(file);
		});
	};
</script>

<div class="post">
	{#each props as prop}
		<UserProperty {...prop} />
	{/each}
	<div>
		<input type="file" bind:value={profilePhoto} on:change={changeFile} />
	</div>
</div>
