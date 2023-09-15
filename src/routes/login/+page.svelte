<script lang="ts">
	import { auth, user } from '$lib/firebase';
	import { signInWithGoogle, signOutSSR } from '$lib/google-auth';
</script>

{#if $user}
	<h2 class="card-title m-3 p-3">Welcome, {$user.displayName}</h2>
	<p class="text-center text-success m-3 p-3">You are logged in</p>
	<button class="btn variant-filled-primary m-3 p-3" on:click={signOutSSR}>Sign out</button>
{:else}
	<button class="btn variant-filled-primary m-3 p-3" on:click={signInWithGoogle}
		>Sign in with Google</button
	>
{/if}
