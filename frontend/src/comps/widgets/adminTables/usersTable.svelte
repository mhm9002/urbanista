<script lang="ts">
import type { User } from "@prisma/client";


    export let users:User[]=[]
</script>

<table class="basic-table">
    <thead>
        <tr>
            <th>User name</th>
            <th>Email</th>
            <th>Activated</th>
            <th>Number of Articles</th>
        </tr>
        
    </thead>
    <tbody>
        {#each users as c}
            <tr>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.activated}</td>
                <td>{c._count.posts}</td>
            </tr>    
        
        
        {/each}
    </tbody>


</table>