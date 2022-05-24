<script lang="ts">
import type { Category } from "@prisma/client";
import CategoryRow from "./categoryRow.svelte";


    export let categories:Category[] =[]

    
    const addCat = ()=>{
        categories = [...categories, {
            id:'', name:'', parent_id: null, _count: {posts:0}
        }]
    }

    const parentOptions = (c)=>{
        let options = categories
            .filter(c2=>c2.parent_id==null&&c2.id!==c.id)
            .map(c2=>{return {value:c2.id, name:c2.name}})

        console.log(options)

        return options

    }
</script>

<table class="basic-table">
    <thead>
        <tr>
            <th>Category Name</th>
            <th>Parent Category</th>
            <th>Number of Posts</th>
            <th>Actions <button on:click={addCat}>Add</button></th>
        </tr>
        
    </thead>
    <tbody>
        {#each categories as c}
            <CategoryRow 
                bind:c={c} 
                parentOptions={[
                    {value:null, name:'None'},
                    ...parentOptions(c)
                ] }
            />
        
        {/each}
    </tbody>
</table>