<script lang="ts">
	import { user, db, type GameData, userData } from '$lib/firebase';
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
						score: 0
					}
				],
				password: '',
				isLive: false,
				waitingForPlayers: true
			};
			console.log(gameData);
			await setDoc(doc(db, 'games', gameID), gameData);
			await updateDoc(doc(db, 'users', $user!.uid), { gameID: gameID });
			gameCode = gameID;
		} catch (e) {
			console.error(e);
		}
	}

	async function startGame() {
		await updateDoc(doc(db, 'games', $userData!.gameID), { isLive: true });
	}
</script>

<h2 class="card-title m-4 p-4">Játék indítása</h2>

{#if $userData?.gameID}
	<div class="container">
		<div class="m-4 flex flex-row content-center justify-center">
			<p data-clipboard="gameCode" class="text-center m-4">{$userData.gameID}</p>
			<button
				class="chip variant-outline-primary m-4"
				use:popup={popupClick}
				use:clipboard={{ element: 'gameCode' }}>Másolás</button
			>
		</div>

		<a
			href="/game/{$userData?.gameID}"
			class="btn variant-filled-primary m-4 p-4"
			on:click={startGame}>Indítás</a
		>
	</div>
{:else}
	<button class="btn variant-filled-primary m-4 p-4" on:click={createGame}>Létrehozás</button>
{/if}

<div class="card p-4 variant-filled-primary" data-popup="popupClick">
	<p>Kód másolva!</p>
	<div class="arrow variant-filled-primary" />
</div>
