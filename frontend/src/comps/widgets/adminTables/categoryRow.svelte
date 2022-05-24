<script lang="ts">
    import type { Category } from "@prisma/client";
    import { fetchApi } from "../../../helpers/api";
    import { queryList } from "../../../helpers/queryList";
    import FormField from "../forms/formField.svelte";
    import FormFieldSelect from "../forms/formFieldSelect.svelte";
    
    export let c:Category
    export let parentOptions:{value: string, name: string}[] =[]

    let editMode= false


    const update = async(c)=>{
        if (c.id===''){
            let pre = await fetchApi(queryList.createCategory, {name:c.name}, true)

            if (pre.code.success){
                c.id=pre.payload
            } else {
                return
            }
        }

        let res = await fetchApi(queryList.updateCategory, c, true)

        if (res.code.success){

        }

        editMode=false
    }


</script>


<tr>
    <td>
        <FormField 
            bind:value={c.name}
            type='text'
            disabled={!editMode}
            placeholder='Category Name'
        />
    <td>
        <FormFieldSelect 
            bind:value={c.parent_id} 
            options={parentOptions}
            disabled={!editMode}
            
        />
    </td>
    <td>{c._count.posts}</td>
    <td>
        {#if editMode}
            <button on:click={()=>update(c)}>Update</button>
            <button on:click={()=>editMode=false}>Cancel</button>
        {:else }
            <button on:click={()=>editMode=true}>Edit</button>
        {/if}
    </td>
</tr>    

