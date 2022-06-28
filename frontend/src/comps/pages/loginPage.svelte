<script lang="ts">
	import { onMount } from 'svelte';

	import { navigate } from 'svelte-routing';
	import { fetchApi } from '../../helpers/api';
	import { queryList } from '../../helpers/queryList';
	import LoginForm from '../widgets/forms/loginForm.svelte';
	import RegisterForm from '../widgets/forms/registerForm.svelte';

	export let id: string = '';

	let loginShow: boolean = true;
	let message: string = '';
	let validationMsg: string = '';

	onMount(() => {
		
		if (id !== '') {
			validateUser();
		}
	});

	const validateUser = async () => {
		let res = await fetchApi(queryList.validateUser, { id });
		if (res.code.success) {
			validationMsg = 'The user is validated. You may sign in NOW';
		} else {
			validationMsg = 'Wrong validation code';
		}
	};

	const onLogin = () => {
		navigate('/', { replace: true });
	};

	const onRegister = () => {
		message =
			'Thank you for creating your account. Please check your email to verify this account';
	};
</script>

<div class="login-page">
	<div class="login-box">
		<p class="cat-title">Login for member benefits</p>
		{#if id !== ''}
			<p>{validationMsg}</p>
		{:else if message === ''}
			{#if loginShow}
				<LoginForm {onLogin} />
				<button class="switch-button" on:click={() => (loginShow = false)}
					>Don't have account? Press here to create a new one</button
				>
			{:else}
				<RegisterForm {onRegister} />
				<button class="switch-button" on:click={() => (loginShow = true)}
					>Already have account! Press here to sign in</button
				>
			{/if}
		{:else}
			<p>{message}</p>
		{/if}
	</div>
	<div class="login-bg" />

</div>

