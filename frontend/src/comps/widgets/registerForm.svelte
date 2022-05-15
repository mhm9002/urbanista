<script lang="ts">
	import { user } from '../../appStore';
	import fetchApi from '../../helpers/api';
	import queryList from '../../helpers/queryList';
	import FormField from './formField.svelte';

	export let onRegister;
	let emailMsg: string = '';
	let passwordMsg: string = '';
	let password2Msg: string = '';

	let email: string = '';
	let name: string = '';
	let password: string = '';
	let password2: string = '';

	const checkEmail = (value: string) => {
		email = value;
		if (!value.includes('@')) {
			emailMsg = 'The entered value does not follow email format';
		}
	};

	const checkPwd = (value: string) => {
		password = value;
		if (value.length < 8 || !value.includes('@')) {
			passwordMsg =
				'Password shall include 8 characters and @ shall be one of them';
		}
	};

	const checkPwd2 = (value: string) => {
		password2 = value;
		if (value !== password) {
			password2Msg = 'The entered value does not match the password entered';
		}
	};

	const login = () => {
		fetchApi(queryList.login, { name, email, password }).then((res) => {
			if (res.success) {
				user.login(res.payload);
				onRegister();
			} else {
				//message = 'Incorrect username or password';
			}
		});
	};
</script>

<form>
	<FormField
		onValueChange={(value) => (name = value)}
		type="name"
		placeholder="Enter your name.."
		message=""
	/>
	<FormField
		onValueChange={(value) => (email = value)}
		type="email"
		placeholder="Enter your email..."
		message={emailMsg}
	/>
	<FormField
		onValueChange={(value) => (password = value)}
		type="password"
		placeholder="Enter your password..."
		message={passwordMsg}
	/>
	<FormField
		onValueChange={(value) => (password2 = value)}
		type="password"
		placeholder="Confirm your password..."
		message={password2Msg}
	/>

	<div class="field is-grouped">
		<div class="control">
			<button on:click={login}>Submit</button>
		</div>
	</div>
</form>
