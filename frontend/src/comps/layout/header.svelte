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

	let showDropmenu = false
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

		<div class="menu-brand-div">
			<a class="menu-brand"  use:link href="\">
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

		<div id="navbarBasicExample" class="menu-center-div">
				{#each mainCats as cat}
					<a class="menu-item" use:link href="\cat\{cat.name}">
						{cat.name}
					</a>
				{/each}
		</div>

		<div class="menu-right-div">
		
		{#if activeUser === undefined}		
			<a class="menu-item" href="\login" use:link > Log in </a>	
		{:else}
			
			<button class="menu-item" id="menu-button" aria-expanded="true" aria-haspopup="true" > {activeUser.name} </button>

			<div class="drop-menu" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
				<a href="\newArticle" use:link class="navbar-item">
					New Article
				</a>
				<button on:click={logout} class="navbar-item"> Logout </button>
			</div>
		
		{/if}
			
		</div>

</nav>
