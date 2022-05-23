<script lang="ts">
import FormField from "../forms/formField.svelte"

    export let name:string
    export let description: string
    export let value:any
    export let editable = true

    let editMode = false
</script>

<div class="profile-user-prop">
    <div class="profile-user-prop-details">
        <div class="profile-user-prop-name">{name}</div>
        <div class="profile-user-prop-value">
            <FormField bind:value={value} type='text' disabled={!editMode}  />
        </div>
        <div class="profile-user-prop-desc">{description}</div>
        
    </div>
    <div class="profile-user-prop-actions">
        {#if editable}
            {#if editMode}
                <button on:click={()=>{editMode=false}}>Save</button>
                <button on:click={()=>editMode=false}>Cancel</button>
            {:else}
                <button on:click={()=>editMode=true}>Edit</button>
            {/if}    
        
        {/if}
    </div>
    
</div>