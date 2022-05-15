<script lang="ts">
	import type { Post } from '@prisma/client';

	export let post: Post;
</script>

<div>
	<div>{post.author.name}</div>
	<div>{post.title}</div>
</div>
