<script lang="ts">
	import { onMount } from 'svelte';

	export let load;

	let myDiv: HTMLDivElement;
	let loading = false;

	onMount(() => {
		window.onwheel = (e) => {
			//console.log(myDiv.offsetTop, window.innerHeight, window.pageYOffset)
			if (loading) return;

			if (myDiv.offsetTop - 100 < window.innerHeight + window.pageYOffset) {
				loading = true;
				setTimeout(() => {
					load();
					loading = false;
				}, 2000);
			}
		};

		return () => {
			window.onwheel = () => {};
		};
	});
</script>

<div bind:this={myDiv}>Loading more...</div>
