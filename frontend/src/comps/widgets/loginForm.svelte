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
				message = 'Incorrect username or password';
			}
		});
	};
</script>

<div>
	<FormField
		onValueChange={(value) => (email = value)}
		type="email"
		placeholder="Enter your email..."
		{message}
	/>
	<FormField
		onValueChange={(value) => (password = value)}
		type="password"
		placeholder="Enter your password..."
		{message}
	/>

	<div class="field is-grouped">
		<div class="control">
			<button on:click={login}>Submit</button>
		</div>
	</div>
</div>
