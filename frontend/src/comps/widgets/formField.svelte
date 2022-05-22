<script lang="ts">
	//export let value:string|number;
	export let value
	export let message: string = '';
	export let type: string;
	export let placeholder: string = '';
	export let disabled: boolean = false
	export let onChange:(e:Event)=>void = (e)=>{}
</script>

<div class="field">
	<div class="control">
		<input
			class="input {message !== '' ? 'is-danger' : ''}"
			value={value}
			{type}
			{placeholder}
			{disabled}
			on:change={(e) => {
				value=(e.currentTarget.value)
				onChange(e)
			}}
		/>
		
	</div>
	<p class="help is-danger">{message}</p>
</div>
