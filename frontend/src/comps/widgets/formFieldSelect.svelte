<script lang="ts">
	//export let value:string|number;
	export let onValueChange: (value: string) => void;
	export let options: Array<{ value: string; name: string }> = [];
	export let defaultValue: string = '';
</script>

<div class="field">
	<div class="control">
		<div class="select">
			<select
				value={defaultValue}
				on:change={(e) => onValueChange(e.currentTarget.value)}
			>
				{#each options as c}
					<option value={c.value}>{c.name}</option>
				{/each}
			</select>
		</div>
	</div>
</div>
