<script lang="ts">
	import type { GameData } from '$lib/types/game.ts';
	import { user, db, userData } from '$lib/firebase';
	import { doc, setDoc, updateDoc } from '@firebase/firestore';
	import { clipboard, popup, type PopupSettings } from '@skeletonlabs/skeleton';

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'top'
	};

	let gameCode: string = '';

	function getGameID() {
		return (
			Date.now().toString(36).toUpperCase() +
			Math.random().toString(36).substring(2, 5).toUpperCase()
		);
	}

	async function createGame() {
		try {
			const gameID = getGameID();
			const gameData: GameData = {
				players: [
					{
						uid: $user!.uid,
						score: 0,
						username: $userData!.username
					}
				],
				password: '',
				isLive: false
			};

			//call create endpoint to create game
			const createResponse = await fetch(`/api/${gameID}/create`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ gameData: gameData })
			});

			if (createResponse.status !== 200) {
				const { message } = await createResponse.json();
				throw new Error(message);
			}

			//we can set user status client side
			//await updateDoc(doc(db, 'users', $user!.uid), { inGame: true });
			gameCode = gameID;
		} catch (e) {
			console.error(e.message);
		}
	}

	async function startGame() {
		// await updateDoc(doc(db, 'games', $userData!.gameID), { isLive: true });
	}
</script>

<h2 class="card-title m-4 p-4">Játék indítása</h2>

<div class="container">
	{#if gameCode}
		<div class="m-4 flex flex-row content-center justify-center">
			<p data-clipboard="gameCode" class="text-center m-4">{gameCode}</p>
			<button
				class="chip variant-outline-primary m-4"
				use:popup={popupClick}
				use:clipboard={{ element: 'gameCode' }}>Másolás</button
			>
		</div>
		<a href="/game/{gameCode}" class="btn variant-outline-primary m-4 p-4">Játék</a>
	{/if}
</div>

<button class="btn variant-filled-primary m-4 p-4" on:click={createGame}>Létrehozás</button>

<div class="card p-4 variant-filled-primary" data-popup="popupClick">
	<p>Kód másolva!</p>
	<div class="arrow variant-filled-primary" />
</div>
