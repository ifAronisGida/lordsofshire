<script lang="ts">
	import type { PageData } from './$types';
	import type { GameData } from '$lib/types/game.ts';
	import { db } from '$lib/firebase';
	import { docStore } from 'sveltefire';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { doc, updateDoc } from 'firebase/firestore';

	export let data: PageData;

	let game = docStore<GameData>(db, `games/${data.gameid}`);
</script>

<AuthCheck>
	<h1 class="text-center m-4">Játék {data.gameid}</h1>
	<p class="text-center m-4">Játékosok: {JSON.stringify($game?.players)}</p>
	<p class="text-center m-4">Játék élő: {$game?.isLive}</p>
</AuthCheck>
