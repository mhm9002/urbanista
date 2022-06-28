<script lang="ts">
	import Brand from './brand.svelte';
	import { link, navigate } from 'svelte-routing';
	import { token, user } from '../../appStore';
	import type { User } from '@prisma/client';
	import SearchForm from '../widgets/forms/searchForm.svelte';
	import { onMount } from 'svelte';
	import { fetchApi } from '../../helpers/api';
	import { queryList } from '../../helpers/queryList';
import FeaturedPostPanel from '../widgets/posts/featuredPostPanel.svelte';

	let showFeatured = 0;

	let mainCats = [
		{
			name: 'Architecture',
			slug: 'architecture',
			featuredPosts: [],
			
		},
		{
			name: 'Urban Design',
			slug: 'urbandesign',
			featuredPosts: [],
			
		},
		{
			name: 'Urban Planning',
			slug: 'planning',
			featuredPosts: [],
			
		},
	];

	let showDropmenu = false;
	let activeUser: User;

	user.subscribe((value) => {
		activeUser = value;

		return () => {
			activeUser = undefined;
		};
	});

	onMount(() => {
		getFeaturedFromCats();
	});

	const logout = () => {
		user.logout();
		token.removeToken();
		navigate('/');
	};

	const getFeaturedFromCats = async () => {
		let options = {
			createdAt: new Date(),
			published: true,
			featured: true,
		};

		mainCats.forEach((c) => {
			fetchApi(queryList.postByCategoryName, {
				name: c.name,
				options,
			}).then((res) => {
				if (res.code.success) {
					c.featuredPosts = res.payload;
				}
			});
		});
	};

	//{showDropmenu ? 'absolute' : 'hidden'}"
</script>

<nav 
	class="navbar" role="navigation" aria-label="main navigation"
	on:mouseleave={()=>showFeatured=0}
>
	<div class="upper-bar">

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
				<a
					class="menu-item"
					use:link
					href="\cat\{cat.name}"
					on:mouseover={
						()=>showFeatured=mainCats.findIndex(c=>c===cat)+1
					}
				>
					{cat.name}
				</a>
			{/each}
			<SearchForm />
		</div>
	
		<div class="menu-right-div">
			{#if activeUser === undefined}
				<a class="menu-item" href="\login" use:link> Log in </a>
			{:else}
				<div class="relative">
					<button
						class="inline-flex items-center"
						on:click={() => (showDropmenu = true)}
						id="menu-button"
						aria-expanded="true"
						aria-haspopup="true"
					>
						<img
							class="profile-inline"
							src={activeUser.profile !== ''
								? 'http://localhost:4000/api/profiles/' + activeUser.profile
								: 'https://bulma.io/images/placeholders/96x96.png'}
						/>
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
							class="menu-item block p-2 hover:bg-purple-300 hover:text-white"
						>
							New Article
						</a>
						<hr />
						<a
							on:click={() => (showDropmenu = false)}
							href="\userArticles"
							use:link
							class="menu-item block p-2 hover:bg-purple-300 hover:text-white"
						>
							My Articles
						</a>
						<a
							on:click={() => (showDropmenu = false)}
							href="\userBookmarks"
							use:link
							class="menu-item block p-2 hover:bg-purple-300 hover:text-white"
						>
							My Bookmarks
						</a>
						<a
							on:click={() => (showDropmenu = false)}
							href="\userProfile"
							use:link
							class="menu-item block p-2 hover:bg-purple-300 hover:text-white"
						>
							My Profile
						</a>
						<hr />
						{#if activeUser.role > 0}
							<a
								on:click={() => (showDropmenu = false)}
								href="\admin"
								use:link
								class="menu-item block p-2 hover:bg-purple-300 hover:text-white"
							>
								Admin Page
							</a>
	
							<hr />
						{/if}
						<a
							href="#"
							on:click={logout}
							class="menu-item block p-2 hover:bg-purple-300 hover:text-white"
						>
							Logout
						</a>
					</div>
				</div>
			{/if}
		</div>
	</div>

	
	<div class="lower-bar {showFeatured==0?'hidden':'relative'}">
		<FeaturedPostPanel posts={mainCats[Math.max(showFeatured-1,0)].featuredPosts} />
	</div>
	
	
</nav>
