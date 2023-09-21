<script lang="ts">
	import type { PageData } from './$types';
	import { db, type GameData } from '$lib/firebase';
	import { docStore } from 'sveltefire';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { doc, updateDoc } from 'firebase/firestore';

	export let data: PageData;

	let game = docStore<GameData>(db, `games/${data.gameid}`);

	async function endGame() {
		await updateDoc(doc(db, 'games', data.gameid), { isLive: false });
		for (const player of $game!.players) {
			console.log(player);
			await updateDoc(doc(db, 'users', player.uid), { gameID: '' });
		}
	}
</script>

<AuthCheck>
	{#if $game?.isLive}
		<button class="fixed bottom-0 right-0 btn variant-soft-warning m-4 p-4" on:click={endGame}
			>VÉGE</button
		>
		<h1 class="text-center m-4">Játék {data.gameid}</h1>
		<p class="text-center m-4">Játékosok: {JSON.stringify($game?.players)}</p>
		<p class="text-center m-4">Játék indítva: {$game?.isLive}</p>
	{:else}
		<h1 class="text-center m-4">Játék vége!</h1>
	{/if}
</AuthCheck>
