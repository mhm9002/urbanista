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
		navigate(previousPage);
	};

	const onRegister = () => {};
</script>

<div class="card">
	{#if loginShow}
		<LoginForm {onLogin} />
		<button on:click={() => (loginShow = false)}
			>Don't have account? Create a new one</button
		>
	{:else}
		<button on:click={() => (loginShow = true)}
			>Already have account! Sign in</button
		>
		<RegisterForm {onRegister} />
	{/if}
</div>
