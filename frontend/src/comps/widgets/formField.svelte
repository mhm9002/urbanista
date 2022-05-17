<script lang="ts">
	//export let value:string|number;
	export let onValueChange: (value: string) => void;
	export let message: string = '';
	export let type: string;
	export let placeholder: string = '';
</script>

<div class="field">
	<div class="control">
		<input
			class="input {message !== '' ? 'is-danger' : ''}"
			{type}
			{placeholder}
			on:change={(e) => onValueChange(e.currentTarget.value)}
		/>
		
	</div>
	<p class="help is-danger">{message}</p>
</div>
