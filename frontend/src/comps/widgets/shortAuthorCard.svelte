<script lang="ts">
	import type { User } from '@prisma/client';

	export let author: User;
</script>

<div>
	<div>{author.name}</div>
	<div>{author.email}</div>
</div>
