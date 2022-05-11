<script lang="ts">
	import Brand from './brand.svelte';
	import { link } from 'svelte-routing';
	import { user } from '../../appStore';
	import type { User } from '@prisma/client';

	let mainCats = [
		{ name: 'Architectue', slug: 'architecture' },
		{ name: 'Urban Design', slug: 'urbandesign' },
		{ name: 'Planning', slug: 'planning' },
	];

	let defaultUser: User = {
		id: '1',
		name: 'Mohammad Najjar',
		email: 'Something@gmail.com',
		password: '',
	};
	let activeUser: User;

	user.subscribe((value) => {
		activeUser = value;

		return () => {
			activeUser = undefined;
		};
	});

	const login = () => {
		console.log('jbnjk');
		user.login(defaultUser);
	};

	const logout = () => user.logout();
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
	<div class="navbar-brand">
		<a class="navbar-item" use:link href="\">
			<Brand />
		</a>

		<a
			role="button"
			class="navbar-burger"
			aria-label="menu"
			aria-expanded="false"
			data-target="navbarBasicExample"
		>
			<span aria-hidden="true" />
			<span aria-hidden="true" />
			<span aria-hidden="true" />
		</a>
	</div>

	<div id="navbarBasicExample" class="navbar-menu">
		<div class="navbar-start">
			{#each mainCats as cat}
				<a class="navbar-item" use:link href="\cat\{cat.slug}">
					{cat.name}
				</a>
			{/each}
		</div>

		<div class="navbar-end">
			<div class="navbar-item">
				{#if activeUser === undefined}
					<div class="buttons">
						<button class="button is-primary">
							<strong>Sign up</strong>
						</button>
						<button on:click={login} class="button is-light"> Log in </button>
					</div>
				{:else}
					<div class="navbar-item has-dropdown is-hoverable">
						<a class="navbar-link"> {activeUser.name} </a>

						<div class="navbar-dropdown">
							<button on:click={logout} class="navbar-item"> Logout </button>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</nav>
