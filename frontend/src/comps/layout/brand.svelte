<script lang="ts">
	import { link } from 'svelte-routing';
	const logo = '/assets/logo_icon.png';
	let text = 'U';
	let animate = false
</script>

<a
	use:link
	href="\"
	class={`menu-brand ${animate?'menu-brand-div-animated':''}`}
	on:mouseover={()=>animate=true}
	on:mouseout={()=>animate=false}
	
>
	<span style="--i:1">U</span>
	<span style="--i:2">R</span>
	<span style="--i:3">B</span>
	<span style="--i:4">A</span>
	<span style="--i:5">N</span>
	<span style="--i:6">I</span>
	<span style="--i:7">S</span>
	<span style="--i:8">T</span>
	<span style="--i:9">A</span>
</a>
<!--<img src={logo} width="28" height="28" />-->
