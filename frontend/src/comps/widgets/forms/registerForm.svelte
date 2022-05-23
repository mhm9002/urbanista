<script lang="ts">

		import {fetchApi} from '../../../helpers/api';
	import { queryList} from '../../../helpers/queryList';
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

	const checkName = ()=>{
		nameMsg=name===''?'Name shall be filled':''
		return name!==''
	}

	const checkEmail = () => {
		if (!email.includes('@')) {
			emailMsg = 'The entered value does not follow email format';
			return false
		} else {
			emailMsg=''
			return true
		}
	};

	const checkPwd = () => {
			if (password.length < 8 || !password.includes('@')) {
			passwordMsg =
				'Password shall include 8 characters and @ shall be one of them';
			return false
		} else {

			passwordMsg = ''
			return true
		}
	};

	const checkPwd2 = () => {
		
		if (password2 !== password) {
			password2Msg = 'The entered value does not match the password entered';
			return false
		} else {
			password2Msg = ''
			return true
		}
	};

	const register = () => {
		if (!checkName() || !checkEmail() || !checkPwd() || !checkPwd2())
			return

		fetchApi(queryList.createUser, { name, email, password }).then((res) => {
			if (res.code.success) {
				
				onRegister();
			} else {
				message = res.code.message;
			}
		});
	};
</script>

<form on:submit={(e) => e.preventDefault()}>
	<FormField
		bind:value={name}
		type="name"
		placeholder="Enter your name.."
		message={nameMsg}
		onChange={checkName}
	/>
	<FormField
		bind:value={email}
		type="email"
		placeholder="Enter your email..."
		message={emailMsg}
		onChange={checkEmail}
	/>
	<FormField
		bind:value={password}
		type="password"
		placeholder="Enter your password..."
		message={passwordMsg}
		onChange={checkPwd}
	/>
	<FormField
		bind:value={password2}
		type="password"
		placeholder="Confirm your password..."
		message={password2Msg}
		onChange={checkPwd2}
	/>

	<div class="field is-grouped">
		<div class="control">
			<button on:click={register}>Submit</button>
		</div>
	</div>
	<div><p class='text-red-400'>{message}</p></div>
</form>
