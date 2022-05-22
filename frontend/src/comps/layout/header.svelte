<script lang="ts">
	import Brand from './brand.svelte';
	import { link, navigate } from 'svelte-routing';
	import { token, user } from '../../appStore';
	import type { User } from '@prisma/client';

	let mainCats = [
		{ name: 'Architecture', slug: 'architecture' },
		{ name: 'Urban Design', slug: 'urbandesign' },
		{ name: 'Urban Planning', slug: 'planning' },
	];

	let showDropmenu = false;
	let activeUser: User;

	user.subscribe((value) => {
		activeUser = value;

		return () => {
			activeUser = undefined;
		};
	});

	const logout = () => {
		user.logout();
		token.removeToken();
		navigate('/');
	};

	//{showDropmenu ? 'absolute' : 'hidden'}"
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
	<div class="menu-brand-div">
		<Brand />

		<a
			href="/"
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
			<a class="menu-item" href="\login" use:link> Log in </a>
		{:else}
			<div class="relative">
				<button
					class=""
					on:click={() => (showDropmenu = true)}
					id="menu-button"
					aria-expanded="true"
					aria-haspopup="true"
				>
					{activeUser.name}
				</button>
				<div
					class=" {showDropmenu
						? 'fixed'
						: 'hidden'} h-screen w-screen left-0 right-0 top-0 bottom-0 bg-black bg-opacity-30"
					on:click={() => (showDropmenu = false)}
				/>

				<div
					class="drop-menu flex flex-col {showDropmenu ? 'relative' : 'hidden'}"
					role="menu"
					aria-orientation="vertical"
					aria-labelledby="menu-button"
					tabindex="-1"
				>
					<a
						on:click={() => (showDropmenu = false)}
						href="\newArticle"
						use:link
						class="menu-item block p-2 hover:bg-orange-300 hover:text-white"
					>
						New Article
					</a>
					<hr />
					<a
						on:click={() => (showDropmenu = false)}
						href="\userArticles"
						use:link
						class="menu-item block p-2 hover:bg-orange-300 hover:text-white"
					>
						My Articles
					</a>
					<a
						on:click={() => (showDropmenu = false)}
						href="\userBookmarks"
						use:link
						class="menu-item block p-2 hover:bg-orange-300 hover:text-white"
					>
						My Bookmarks
					</a>
					<a
						on:click={() => (showDropmenu = false)}
						href="\userProfile"
						use:link
						class="menu-item block p-2 hover:bg-orange-300 hover:text-white"
					>
						My Profile
					</a>
					<hr />
					<a
						href="#"
						on:click={logout}
						class="menu-item block p-2 hover:bg-orange-300 hover:text-white"
					>
						Logout
					</a>
				</div>
			</div>
		{/if}
	</div>
</nav>
