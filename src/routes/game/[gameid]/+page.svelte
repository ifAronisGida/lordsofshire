<script lang="ts">
	import type { PageData } from './$types';
	import type { GameData } from '$lib/types/game.ts';
	import { db } from '$lib/firebase';
	import { docStore } from 'sveltefire';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import PlayerList from '$lib/components/PlayerList.svelte';
	import RemainingTimeCounter from '$lib/components/RemainingTimeCounter.svelte';

	export let data: PageData;

	let game = docStore<GameData>(db, `games/${data.gameid}`);
</script>

<AuthCheck>
	{#if $game?.players}<PlayerList players={$game.players} />{/if}
	{#if $game?.remainingSeconds}<RemainingTimeCounter
			remainingSeconds={$game?.remainingSeconds}
		/>{/if}
	<h1 class="text-center m-4">Játék {data.gameid}</h1>
	{#if $game?.isLive && $game?.question && $game?.turn > 0}
		<h2 class="text-center m-4">{$game.turn}. kérdés</h2>
		<h3 class="text-center m-4">{$game.question.question}</h3>
		<div class="flex flex-col">
			{#each $game.question.answers as answer}
				<p class="btn variant-form-material m-4">{answer.value}</p>
			{/each}
		</div>
	{/if}
</AuthCheck>
