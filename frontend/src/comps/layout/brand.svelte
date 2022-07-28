<script lang="ts">
	import { navigate } from 'svelte-routing';
	const logo = '/assets/logo_icon.png';
	let animate = false;
	let name = 'Urbanista';
</script>

<label
	on:click={() => navigate('/')}
	class={`menu-brand ${animate ? 'menu-brand-div-animated' : ''}`}
	on:mouseover={() => (animate = true)}
	on:mouseout={() => (animate = false)}
>
	{#each name as n}
		<span>{n}</span>
	{/each}
</label>
<!--<img src={logo} width="28" height="28" />-->
