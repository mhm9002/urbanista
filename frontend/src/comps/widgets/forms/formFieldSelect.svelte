<script lang="ts">
	//export let value:string|number;
	
	export let options: Array<{ value: string; name: string }> = [];
	export let value: string = '';
	export let disabled = false
</script>

<div class="field">
	<div class="control">
		<div class="select">
			<select
				bind:value={value}
				disabled={disabled}
			>
				{#each options as c}
					<option value={c.value}>{c.name}</option>
				{/each}
			</select>
		</div>
	</div>
</div>
