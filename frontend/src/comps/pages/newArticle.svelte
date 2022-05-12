<script lang="ts">
import type { Post, User, Category } from "@prisma/client";

    import { user } from "../../appStore";
    import Editor from "../widgets/editor.svelte";


    import { onMount } from 'svelte';
    import fetchApi from '../../helpers/api';
    import queryList from '../../helpers/queryList';


    let content = {html:'', text:''}
    let activeUser:User;
    let loadedCats: Category[];

    let newPost:Post = {title:'', authorId:'', content:'', categoryId:'', createdAt: new Date(), featured:false, published:false, id:'' }

    user.subscribe (value=>{
        activeUser = value
        newPost.authorId = value.id
        return ()=>{activeUser=undefined}
    })

    onMount(async () => {
        
        let res = await fetchApi(queryList.allCategories, {});
        loadedCats = res
        newPost.categoryId = res[0].id
        return () => {};
    });



    const savePost = async ()=>{
        newPost.content = content.html;
        newPost.createdAt = new Date();
        
        let res = await fetchApi(queryList.createPost, {postData: {...newPost}})
        console.log(res)
        
        /*
        articles.add({
            id: Math.floor( Math.random()*100).toString(), author: activeUser, content:content.html, title:"blabla", date:new Date()
        })
        */
    }
</script>

<main>

    <Editor content={content} onchange={(value)=>content=value} />
    <button on:click={savePost}>Save</button>
</main>