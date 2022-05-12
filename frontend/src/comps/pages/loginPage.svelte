<script lang="ts">
    import { user } from "../../appStore";

    import fetchApi from "../../helpers/api";
    import queryList from "../../helpers/queryList";

    let messge:string = ''
    let email:string=''
    let password:string=''

    const login = () => {
		fetchApi(queryList.login,{email, password}).then(res=>{
			if (res.success){
                user.login(res.user);
            } else {
                messge='Incorrect user or password'
            }
		})		
	};
</script>

<div>
    <input type="text" on:change={(e)=>email=e.currentTarget.value} placeholder="Enter email...">
    <input type="password" on:change={(e)=>password=e.currentTarget.value}>
    <button on:click={login}>Login</button>
    <p>{messge}</p>
</div>