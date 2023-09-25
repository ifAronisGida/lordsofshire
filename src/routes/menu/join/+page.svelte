<script lang="ts">
	import type { PageData } from './$types';
	import { db, userData, user } from '$lib/firebase';
	import { doc, getDoc, updateDoc } from 'firebase/firestore';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let gameID = '';
	let errorMessage = '';

	async function joinGame() {
		try {
			const response = await fetch(`/api/${gameID}/join`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
					// 'CSRF-Token': csrfToken  // HANDLED by sveltekit automatically
				},
				body: JSON.stringify({ uid: $user!.uid, username: $userData!.username })
			});

			if (response.status !== 200) {
				const { message } = await response.json();
				throw new Error(message);
			}
			//await updateDoc(doc(db, 'users', $user!.uid), { inGame: true });
			goto(`/game/${gameID}`);
		} catch (e) {
			console.error(e.message);
		}
	}
</script>

<div class="h2 m-4">Csatlakozás játékhoz</div>
<form
	class="flex justify-center items-center flex-col w-full max-w-md mx-auto"
	on:submit|preventDefault={joinGame}
>
	<input type="text" placeholder="Kód" class="input w-full m-4" bind:value={gameID} />
	<button class="btn variant-filled-primary m-4"> Csatlakozás! </button>
</form>
{#if errorMessage != ''}
	<p class="text-error text-sm m-4">{errorMessage}</p>
{/if}
