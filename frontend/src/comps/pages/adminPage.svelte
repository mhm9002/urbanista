<script lang="ts">
import type { Category, Post, User } from "@prisma/client";
import { onMount } from "svelte";
import { fetchApi } from "../../helpers/api";
import { queryList } from "../../helpers/queryList";
import CategoriesTable from "../widgets/adminTables/categoriesTable.svelte";
import PostsTable from "../widgets/adminTables/postsTable.svelte";
import UsersTable from "../widgets/adminTables/usersTable.svelte";

    let categories:Category[] =[]
    let users:User[] = []
    let posts:Post[] = []

    onMount(async ()=>{
        let res= await fetchApi(queryList.allCategories, {})
        
        if (res.code.success){
            categories = res.payload
            
        }

        res= await fetchApi(queryList.allUsers, {}, true)

        if (res.code.success){
            users = res.payload
        }


        res= await fetchApi(queryList.allPost, {}, true)

        if (res.code.success){
            posts = res.payload
        }


        return ()=>{
            categories= []
            users=[]
            posts = []
        }
    })

</script>

<div class="post">
    <CategoriesTable {categories} />
    <UsersTable {users} />
    <PostsTable {posts} />

</div>