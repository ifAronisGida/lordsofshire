<script lang="ts">
	import type { PageData } from './$types';
	import { db, user } from '$lib/firebase';
	import { doc, getDoc, updateDoc } from 'firebase/firestore';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let gameID = '';

	async function joinGame() {
		console.log('joining game');
		try {
			const game = await getDoc(doc(db, 'games', gameID));
			if (game.data()) {
				await updateDoc(doc(db, 'games', gameID), {
					players: [...game.data()!.players, { uid: $user!.uid, score: 0 }]
				});
				console.log(game.data());
				goto(`/game/${gameID}`);
			}
		} catch (e) {
			console.error(e);
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
