<script lang="ts">
    import Footer from './footer.svelte'
import Header from './header.svelte'
    import Sidebar from './sidebar.svelte'

    export let header=true
    export let sidebar=true
</script>

{#if header}
<Header />
{/if}

<div class="main-box">
    <div class="route-page">
        <slot name='component' />
    </div>
    {#if sidebar}
        <Sidebar>
            <slot name='sidebar' />
        </Sidebar>
    {/if}
</div>

<Footer />
