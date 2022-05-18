<script lang="ts">
	import { link } from 'svelte-routing';
	const logo = '/assets/logo_icon.png';
	let text = 'U';
</script>

<a
	use:link
	href="\"
	class="menu-brand "
	on:mousemove={() => (text = 'Urbanista')}
	on:mouseleave={() => (text = 'U')}
>
	{text}
</a>
<!--<img src={logo} width="28" height="28" />-->
