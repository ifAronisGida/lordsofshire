<script lang="ts">
	import type { PageData } from './$types';
	import { userData, user, db, type GameData } from '$lib/firebase';
	import { doc, setDoc } from 'firebase/firestore';

	export let data: PageData;

	async function createGame() {
		const gameData: GameData = {
			players: [
				{
					uid: $user!.uid,
					score: 0
				}
			],
			gameCode: $user!.uid,
			isOver: false
		};
		console.log(gameData);
		await setDoc(doc(db, 'games', $user!.uid), gameData);
	}
</script>

<h2 class="card-title m-4 p-4">Játék indítása</h2>
<p class="m-4">beállítások...</p>
<p class="m-4">{$userData?.username}</p>
<button class="btn variant-filled-primary m-4 p-4" on:click={createGame}>Indítás</button>
