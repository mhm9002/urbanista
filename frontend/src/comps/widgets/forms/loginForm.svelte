<script lang="ts">
	import { token, user } from './../../../appStore';
	import { fetchApi } from './../../../helpers/api';
	import { queryList } from './../../../helpers/queryList';
	import FormField from './formField.svelte';

	export let onLogin;
	let message: string = '';
	let email: string = '';
	let password: string = '';

	const login =  () => {
		
		if (email===''||password===''){
			message = 'Incomplete credentials'
			return
		}
		
		fetchApi(queryList.login, { email, password }).then((res) => {
		
			if (res.code.success) {
				console.log(res.payload)
				user.login(res.payload.user);
				token.saveToken(res.payload.token);
				onLogin();
			} else {
		
				message = res.code.message;
			}
		});
	};
</script>

<form on:submit={(e) => e.preventDefault()}>
	<FormField
		bind:value={email}
		type="email"
		placeholder="Enter your email..."
	/>
	<FormField
	bind:value={password}
		type="password"
		placeholder="Enter your password..."
	/>
	<div><p class="text-red-400">{message}</p></div>
	<div class="field is-grouped">
		<div class="control">
			<button on:click={login}>Submit</button>
		</div>
	</div>
</form>
