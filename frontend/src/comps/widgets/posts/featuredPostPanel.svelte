<script lang="ts">
	import type { Post } from '@prisma/client';
	import moment from 'moment';
	import { link, navigate } from 'svelte-routing';

	export let posts: Post[];
    
    let mainPosts = posts.length>3? posts.slice(0,2):posts
    $: posts, mainPosts=posts.length>3? posts.slice(0,2):posts
    


</script>

<div class="featuredPanel">
    {#each posts as mainPost}
    
    <div class="mainPost">
        {#if mainPost.image !== ''}
            <figure>
                <img
                    class="featuredImage"
                    src={'http://localhost:4000/api/images/' + mainPost.image}
                    alt="Placeholder image"
                />
            </figure>
        {/if}
        <a class="text-lg" 
            href="/article/{mainPost.id}" 
            use:link
        >{mainPost.title}</a>
        
        <div class="featured-author">
    
            <time class="child text-xs" datetime={new Date(mainPost.createdAt)}
                >{moment(new Date(mainPost.createdAt), false).fromNow()}</time
            >
            <div class="child inline-flex items-center">
                <img
                    class="profile-inline"
                    src={mainPost.author?.profile !== ''
                        ? `http://localhost:4000/api/profiles/${mainPost.author.profile}`
                        : 'https://bulma.io/images/placeholders/96x96.png'}
                    alt="Placeholder image"
                />
                    <div>
                <a class="text-xs" href="\author\{mainPost.authorId}" use:link>
                    {mainPost.author.name}</a
                >
            </div>
            </div>
                
                <a class="child text-xs" href="\cat\{mainPost.category.name}" use:link
                    >{mainPost.category.name}</a
                >
        
            </div>          
                
   
    </div>
    {/each}
</div>




<style>
	.linker:hover {
		text-decoration: none;
	}
</style>
