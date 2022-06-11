<script lang="ts">
	export let message = '';
</script>

<div class="loading-wrapper items-center content-center">
	<div class="flex flex-col min-w-fit w-1/2 content-center items-center">
		<p class="self-center justify-center">{message}</p>
		<slot />
	</div>
</div>
