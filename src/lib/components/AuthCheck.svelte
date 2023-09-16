<script lang="ts">
	import { user } from '$lib/firebase';
</script>

{#if $user}
	<slot />
{:else}
	<div class="w-4/6 bg-neutral text-neutral-content mx-auto">
		<div class="items-center text-center">
			<p class="m-3 p-3 text-warning-400">Lépj be vagy regisztrálj!</p>
			<a class="btn variant-ghost-warning max-w-xs m-3 p-3" href="/login">Belépés</a>
		</div>
	</div>
{/if}
