<script lang="ts">
import type { Category } from "@prisma/client";


    export let categories:Category[] =[]
</script>

<table class="basic-table">
    <thead>
        <tr>
            <th>Category Name</th>
            <th>Parent Category</th>
            <th>Number of Posts</th>
        </tr>
        
    </thead>
    <tbody>
        {#each categories as c}
            <tr>
                <td>{c.name}</td>
                <td>{c.parent_id!==null?categories.find(cat=>cat.id===c.parent_id).name:'None'}</td>
                <td>{c._count.posts}</td>
            </tr>    
        
        
        {/each}
    </tbody>
</table>