<script lang="ts">
	import type { User } from '@prisma/client';

	import { user } from '../../appStore';
	import UserProperty from '../widgets/settings/userProperty.svelte';
	import UserPropertyImage from '../widgets/settings/userPropertyImage.svelte';

	let activeUser: User;
	

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

	const setAsAdmin=  ()=>{
		
		user.login({...activeUser, role:1})
	}
</script>

<div class="post">
	{#each props as prop}
		<UserProperty {...prop} />
	{/each}
	<UserPropertyImage profile={activeUser.profile} userId={activeUser.id} updateProfile={(profile=>user.login({...activeUser, profile}))} />
	<button on:click={setAsAdmin}>Set me as admin</button>
</div>


