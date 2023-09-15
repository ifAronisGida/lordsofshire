<script lang="ts">
	import { page } from '$app/stores';
	import AnimatedRoute from '$lib/components/AnimatedRoute.svelte';
</script>

<nav class="flex justify-center my-6">
	<ul class="steps">
		<a
			href="/login"
			class="btn {$page.route.id === '/login' ? 'variant-ghost-primary' : 'variant-outline'}"
		>
			Belépés
		</a>
		<a
			href="/login/username"
			class="btn {$page.route.id === '/login/username'
				? 'variant-ghost-primary'
				: 'variant-outline'}"
		>
			Név
		</a>
		<a
			href="/login/photo"
			class="btn {$page.route.id === '/login/photo' ? 'variant-ghost-primary' : 'variant-outline'}"
		>
			Kép
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
