<script lang="ts">
	import type { PageData } from './$types';
	import { db, user, userData } from '$lib/firebase';
	import { doc, getDoc, updateDoc } from 'firebase/firestore';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let gameID = '';
	let errorMessage = '';

	async function checkGameState() {
		console.log('checking game state of ', gameID);
		const gameRef = doc(db, 'games', gameID);
		const gameSnapshot = await getDoc(gameRef);
		if (gameSnapshot.exists()) {
			const gameData = gameSnapshot.data();
			console.log(gameData);
			return gameData?.isLive;
		}
		return false;
	}

	async function joinGame() {
		console.log('joining game');
		try {
			const gameStarted = await checkGameState();
			console.log(gameStarted);
			if (gameStarted) {
				const game = await getDoc(doc(db, 'games', gameID));
				if (game.data()) {
					await updateDoc(doc(db, 'games', gameID), {
						players: [...game.data()!.players, { uid: $user!.uid, score: 0 }]
					});
					console.log(game.data());
					await updateDoc(doc(db, 'users', $user!.uid), { gameID: gameID });
					goto(`/game/${gameID}`);
				}
			} else {
				errorMessage = 'A játék még nem indult el!';
			}
		} catch (e) {
			console.error(e);
		}
	}
</script>

{#if !$userData?.gameID}
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
{:else}
	<div class="h2 m-4">Már játékban vagy!</div>
	<a href="/game/{$userData?.gameID}" class="btn variant-filled-primary m-4"> Csatlakozás! </a>
{/if}
