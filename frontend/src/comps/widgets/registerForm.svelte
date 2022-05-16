<script lang="ts">

	import { user } from '../../appStore';
	import fetchApi from '../../helpers/api';
	import queryList from '../../helpers/queryList';
	import FormField from './formField.svelte';

	export let onRegister;
	let emailMsg: string = '';
	let passwordMsg: string = '';
	let password2Msg: string = '';
	let nameMsg: string = '';
	let message: string ='';

	let email: string = '';
	let name: string = '';
	let password: string = '';
	let password2: string = '';

	const checkName = (value:string)=>{
		nameMsg=value===''?'Name shall be filled':''
		return value!==''
	}

	const checkEmail = (value: string) => {
		if (!value.includes('@')) {
			emailMsg = 'The entered value does not follow email format';
			return false
		} else {
			emailMsg=''
			return true
		}
	};

	const checkPwd = (value: string) => {
			if (value.length < 8 || !value.includes('@')) {
			passwordMsg =
				'Password shall include 8 characters and @ shall be one of them';
			return false
		} else {

			passwordMsg = ''
			return true
		}
	};

	const checkPwd2 = (value: string) => {
		
		if (value !== password) {
			password2Msg = 'The entered value does not match the password entered';
			return false
		} else {
			password2Msg = ''
			return true
		}
	};

	const register = () => {
		if (!checkName(name) || !checkEmail(email) || !checkPwd(password) || !checkPwd2(password2))
			return

		fetchApi(queryList.createUser, { name, email, password }).then((res) => {
			if (res.success) {
				
				onRegister();
			} else {
				message = res.message;
			}
		});
	};
</script>

<form on:submit={(e) => e.preventDefault()}>
	<FormField
		onValueChange={(value) => {
			name = value
			checkName(value)
		}}
		type="name"
		placeholder="Enter your name.."
		message={nameMsg}
	/>
	<FormField
		onValueChange={(value) => {
			email = value;
			checkEmail(value);
		}}
		type="email"
		placeholder="Enter your email..."
		message={emailMsg}
	/>
	<FormField
		onValueChange={(value) => {
			password = value;
			checkPwd(value);
		}}
		type="password"
		placeholder="Enter your password..."
		message={passwordMsg}
	/>
	<FormField
		onValueChange={(value) => {
			password2 = value;
			checkPwd2(value);
		}}
		type="password"
		placeholder="Confirm your password..."
		message={password2Msg}
	/>

	<div class="field is-grouped">
		<div class="control">
			<button on:click={register}>Submit</button>
		</div>
	</div>
	<div><p class='text-red-400'>{message}</p></div>
</form>
