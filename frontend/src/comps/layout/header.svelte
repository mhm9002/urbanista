<script lang="ts">
	import Brand from './brand.svelte';
	import { link, navigate } from 'svelte-routing';
	import { user } from '../../appStore';
	import type { User } from '@prisma/client';

	let mainCats = [
		{ name: 'Architecture', slug: 'architecture' },
		{ name: 'Urban Design', slug: 'urbandesign' },
		{ name: 'Urban Planning', slug: 'planning' },
	];

	let activeUser: User;

	user.subscribe((value) => {
		activeUser = value;

		return () => {
			activeUser = undefined;
		};
	});

	const logout = () => {
		user.logout();
		navigate('/');
	};
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
				<a class="bg-green-400" use:link href="\cat\{cat.name}">
					{cat.name}
				</a>
			{/each}
		</div>

		<div class="navbar-end">
			<div class="navbar-item">
				{#if activeUser === undefined}
					<div class="buttons">
						<a href="\login" use:link class="button is-light"> Log in </a>
					</div>
				{:else}
					<div class="navbar-item has-dropdown is-hoverable">
						<a class="navbar-link"> {activeUser.name} </a>

						<div class="navbar-dropdown">
							<a href="\newArticle" use:link class="navbar-item">
								New Article
							</a>
							<button on:click={logout} class="navbar-item"> Logout </button>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</nav>
