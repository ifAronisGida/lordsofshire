<script lang="ts">
	import { page } from '$app/stores';
	import AnimatedRoute from '$lib/components/AnimatedRoute.svelte';
</script>

<nav class="flex justify-center my-6">
	<ul class="steps">
		<a
			href="/menu/create"
			class="btn {$page.route.id === '/menu/create' ? 'variant-ghost-primary' : 'variant-outline'}"
		>
			Létrehozás
		</a>
		<a
			href="/menu/join"
			class="btn {$page.route.id === '/menu/join' ? 'variant-ghost-primary' : 'variant-outline'}"
		>
			Csatlakozás
		</a>
	</ul>
</nav>

<AnimatedRoute>
	<main class="card w-4/6 bg-neutral text-neutral-content mx-auto">
		<div class="card-body items-center text-center">
			<slot />
		</div>
	</main>
</AnimatedRoute>
