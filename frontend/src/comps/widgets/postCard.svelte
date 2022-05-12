<script lang="ts">
    import {link} from 'svelte-routing'
    import type { Post } from "../../urbanisticTypes";
    export let post:Post
</script>

<main>
    
    
        <div class="card">
        
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-128x128">
                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
              </figure>
            </div>
            <div class="media-content" style="text-align: left">
                <div class="content">
                    <a href="post/{post.id}" use:link class="linker"><p class="title is-4">{post.title}</p></a>
                    <p class="subtitle is-6 ">{post.author.name}</p>
                    {post.content}<br/>
                    <time datetime={post.date}>{post.date.toDateString()}</time>
                </div>
            </div>
          </div>
        </div>
      </div>
    
</main>

<style>
.linker:hover {
    text-decoration: none;
}
</style>