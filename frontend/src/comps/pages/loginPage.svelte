<script lang="ts">
	import { onMount } from 'svelte';

	import { navigate } from 'svelte-routing';
	import LoginForm from '../widgets/loginForm.svelte';
	import RegisterForm from '../widgets/registerForm.svelte';
	export let previousPage = '';

	let loginShow = true;

	onMount(() => {
		console.log(previousPage);
	});

	const onLogin = () => {
		navigate('/', { replace: true });
	};

	const onRegister = () => {};
</script>

<div class="login-page">
	<div class="login-box">
		<p class="cat-title">Login for member benefits</p>
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
	</div>
	<div class="login-bg" />
</div>
