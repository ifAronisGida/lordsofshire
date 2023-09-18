<script lang="ts">
	import { user } from '$lib/firebase';
	import { signInWithGoogle, signOutSSR } from '$lib/google-auth';
</script>

{#if $user}
	<h2 class="card-title m-3 p-3">Üdv, {$user.displayName}</h2>
	<p class="text-center text-success m-3 p-3">Be is vagy lépve</p>
	<button class="btn variant-filled-primary m-3 p-3" on:click={signOutSSR}>Kijelentkezés</button>
{:else}
	<button class="btn variant-filled-primary m-3 p-3" on:click={signInWithGoogle}
		>Belépés Google fiókkal</button
	>
{/if}
