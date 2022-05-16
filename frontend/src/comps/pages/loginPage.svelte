<script lang="ts">
	import { onMount } from 'svelte';

	import { navigate } from 'svelte-routing';
	import LoginForm from '../widgets/loginForm.svelte';
	import RegisterForm from '../widgets/registerForm.svelte';
	export let previousPage = '';

	let loginShow = true;
	let message = ''

	onMount(() => {
		console.log(previousPage);
	});

	const onLogin = () => {
		navigate('/', { replace: true });
	};

	const onRegister = () => {
		message = "Thank you for creating your account. Please check your email to verify this account"
	};
</script>

<div class="login-page">
	<div class="login-box">
		<p class="cat-title">Login for member benefits</p>
		{#if (message==='')}
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
