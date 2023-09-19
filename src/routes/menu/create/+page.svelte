<script lang="ts">
	import { user, db } from '$lib/firebase';
	import { doc, setDoc } from 'firebase/firestore';
	import { clipboard } from '@skeletonlabs/skeleton';

	let gameCode: string = '';

	interface GameData {
		password: string;
		isLive: boolean;
		players: [{ uid: string; score: number }];
	}

	function getGameID() {
		return Date.now().toString(36).toUpperCase();
	}

	async function createGame() {
		const gameID = getGameID();
		const gameData: GameData = {
			players: [
				{
					uid: $user!.uid,
					score: 0
				}
			],
			password: '',
			isLive: false
		};
		console.log(gameData);
		await setDoc(doc(db, 'games', gameID), gameData);
		gameCode = gameID;
	}
</script>

<h2 class="card-title m-4 p-4">Játék indítása</h2>

{#if gameCode}
	<div class="container flex-row">
		<p class="m-4" data-clipboard="gameCode">{gameCode}</p>
		<button class="chip variant-outline-primary" use:clipboard={{ element: 'gameCode' }}
			>Másolás</button
		>
	</div>
{/if}
<button class="btn variant-filled-primary m-4 p-4" on:click={createGame}>Indítás</button>
