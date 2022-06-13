<script lang="ts">
	import { uploadApi } from '../../../helpers/api';
	import { uploadQueryList } from '../../../helpers/queryList';

	export let userId;
	export let profile;
	export let updateProfile;

	let profilePhoto: Blob;
	let editMode: boolean = false;

	const changeFile = async (e) => {
		let file = e.target.files[0];
		profilePhoto = await resizeImage(file);
	};

	const uploadProfile = async () => {
		let res2 = await uploadApi(
			uploadQueryList.uploadProfile,
			profilePhoto,
			userId
		);
		editMode = false;
		updateProfile(res2);
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
					document.getElementById('profile').src = canvas.toDataURL();
					canvas.toBlob((b) => resolve(b), file.type);
				};
				img.src = e.target.result;
			};
			reader.readAsDataURL(file);
		});
	};
</script>

<div class="profile-user-prop">
	<div class="profile-user-prop-details">
		<div class="profile-user-prop-name">Profile Picture</div>
		<div class="profile-user-prop-value">
			<img
				src={profile !== ''
					? 'http://192.168.100.11:4000/api/profiles/' + profile
					: 'https://bulma.io/images/placeholders/96x96.png'}
				class={`profile-user-photo ${
					!editMode ? ' profile-user-photo-edit' : ''
				}`}
				id="profile"
				on:click={() => {
					if (editMode) document.getElementById('file').click();
				}}
			/>
			<input
				hidden
				id="file"
				type="file"
				accept="image/*"
				on:change={changeFile}
			/>
		</div>
		<div class="profile-user-prop-desc">
			Upload a photo that represents you or your character
		</div>
	</div>
	<div class="profile-user-prop-actions">
		{#if editMode}
			<button on:click={uploadProfile}>Save</button>
			<button on:click={() => (editMode = false)}>Cancel</button>
		{:else}
			<button on:click={() => (editMode = true)}>Edit</button>
		{/if}
	</div>
</div>
