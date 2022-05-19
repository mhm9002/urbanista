<script lang="ts">
import { fetchApi } from "../../helpers/api";
import { queryList } from "../../helpers/queryList";

    export let userId:string = ''
    export let articleId:string = ''
    export let liked;
    export let bookmarked;
    
	let liking = false;
	let bookmarking = false
	
    const bookmarkPost = async () => {
		if (bookmarking)
			return;
		
		bookmarking = true
		let res = await fetchApi(
			queryList.bookmarkPost,
			{ postId: articleId, userId },
			true
		);

		if (res.code.success) {
			//toggled bookmark
			bookmarked =  (res.code.code!==251)
			console.log(res.code)
		} else {
			console.log(res.code.message);
		}

		bookmarking = false
	};

	const likePost = async () => {
		if (liking)
			return;
		
		liking = true
		let res = await fetchApi(
			queryList.likePost,
			{ postId: articleId, userId },
			true
		);

		if (res.code.success) {
			//toggled bookmark
			liked =  (res.code.code!==271)
			console.log(res.code)
		} else {
			console.log(res.code.message);
		}
        
        liking = false
	};


</script>


<div class="post-interaction">
    <div class="post-interaction-left">
        <button class="action-clickable">
        
            <i class="material-icons">chat_bubble</i>
        
        </button>
        <button
            on:click={likePost}
            disabled={liking}
            class="action-clickable { liked ? 'action-active' : ''}"
        >
            <i class="material-icons">favorite</i>
        </button>
    </div>
    <div class="post-interaction-right">
        <button
            on:click={bookmarkPost}
            disabled={bookmarking}
            class="action-clickable {bookmarked ? 'action-active' : ''}"
        >
            <i class="material-icons">book</i>
        </button>

        <button class="action-clickable">
            <i class="material-icons">flag</i>
        </button>
    </div>
</div>