<script lang="ts">
	import type { PageData } from './$types';
	import { db, type GameData } from '$lib/firebase';
	import { docStore } from 'sveltefire';

	export let data: PageData;

	let game = docStore<GameData>(db, `games/${data.gameid}`);
</script>

<h1 class="text-center m-4">Játék {data.gameid}</h1>
<p class="text-center m-4">Játékosok: {JSON.stringify($game?.players)}</p>
<p class="text-center m-4">Játék indítva: {$game?.isLive}</p>
