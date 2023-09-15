<script lang="ts">
	import { auth, user } from '$lib/firebase';
	import { signInWithGoogle, signOutSSR } from '$lib/google-auth';
</script>

{#if $user}
	<h2 class="card-title">Welcome, {$user.displayName}</h2>
	<p class="text-center text-success">You are logged in</p>
	<button class="btn btn-warning" on:click={signOutSSR}>Sign out</button>
{:else}
	<button class="btn btn-primary" on:click={signInWithGoogle}>Sign in with Google</button>
{/if}
