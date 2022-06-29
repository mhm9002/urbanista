<script lang="ts" >
    import type { Post, User } from "@prisma/client";
import { user } from "../../../appStore";
    import { fetchApi } from "../../../helpers/api";
    import { queryList } from "../../../helpers/queryList";
    import { link, navigate } from 'svelte-routing';


    export let id=''
    let articleId: string = '';
	let post: Post;
    
    let activeUser: User = null;

	user.subscribe((value) => {
		activeUser = value;
		return () => (activeUser = null);
	});

    $: {
		if (articleId !== id) {
			articleId = id;
			updateArticle();
		}
	}

	const updateArticle = async () => {
		let res = await fetchApi(
			queryList.getPost,
			{
				id: articleId,
				fullPost: true,
				userId: activeUser.id||'',
				details:true
			},
			true
		);

		if (res.code.success) 
			post = res.payload.post;
			
	};
</script>


{#if post!==undefined}
<div class="side-article-author">
    <img
        class="side-article-author-photo"
        src={post.author?.profile !== ''
            ? `http://localhost:4000/api/profiles/${post.author.profile}`
            : 'https://bulma.io/images/placeholders/96x96.png'}
        alt="Placeholder image"
    />

    <a class="side-article-author-name" href="\author\{post.authorId}" use:link>
        {post.author?.name}</a
    >
    <p>
        {post.author?.desc}
    </p>

</div>
    
{/if}