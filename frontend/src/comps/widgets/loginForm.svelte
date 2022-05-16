<script lang="ts">
	import { user } from '../../appStore';
	import fetchApi from '../../helpers/api';
	import queryList from '../../helpers/queryList';
	import FormField from './formField.svelte';

	export let onLogin;
	let message: string = '';
	let email: string = '';
	let password: string = '';

	const login = () => {
		fetchApi(queryList.login, { email, password }).then((res) => {
			if (res.success) {
				user.login(res.payload);
				onLogin();
			} else {
				message = res.message;
			}
		});
	};
</script>

<form on:submit={(e) => e.preventDefault()}>
	<FormField
		onValueChange={(value) => (email = value)}
		type="email"
		placeholder="Enter your email..."
		
	/>
	<FormField
		onValueChange={(value) => (password = value)}
		type="password"
		placeholder="Enter your password..."
		
	/>
	<div><p class='text-red-400'>{message}</p></div>
	<div class="field is-grouped">
		<div class="control">
			<button on:click={login}>Submit</button>
		</div>
	</div>
	
</form>
