<script lang="ts">
	import type { PageData } from './$types';
	import type { GameData } from '$lib/types/game.ts';
	import { db, user } from '$lib/firebase';
	import { docStore } from 'sveltefire';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import PlayerList from '$lib/components/PlayerList.svelte';
	import RemainingTimeCounter from '$lib/components/RemainingTimeCounter.svelte';

	export let data: PageData;

	let game = docStore<GameData>(db, `games/${data.gameid}`);

	//don't break game if player spams the ready button
	let debounceTimer: NodeJS.Timeout;

	let isReady = false;
	let remainingSeconds = 0;
	let selectedAnswer = '';
	$: turnLengthSeconds = $game?.turnLengthSeconds || 0;
	$: turn = $game?.turn;

	//reset round when turn changes
	$: turn && resetRound();

	function resetRound() {
		remainingSeconds = turnLengthSeconds;
		selectedAnswer = '';

		//count down remaining time
		let timerId = setInterval(() => {
			remainingSeconds--;
			console.log(remainingSeconds);
		}, 1000);

		setTimeout(() => {
			clearInterval(timerId);
		}, turnLengthSeconds * 1000);
	}

	async function changeReadyStatus() {
		isReady = !isReady;

		clearTimeout(debounceTimer);

		debounceTimer = setTimeout(async () => {
			try {
				const response = await fetch(`/api/${data.gameid}/game`, {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
						// 'CSRF-Token': csrfToken  // HANDLED by sveltekit automatically
					},
					body: JSON.stringify({ ready: isReady, uid: $user?.uid })
				});

				if (response.status !== 200) {
					const { message } = await response.json();
					throw new Error(message);
				}
			} catch (e) {
				console.error(e.message);
			}
		}, 1000);
	}

	async function sendAnwer(answerID: string) {
		clearTimeout(debounceTimer);

		debounceTimer = setTimeout(async () => {
			try {
				const response = await fetch(`/api/${data.gameid}/game`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
						// 'CSRF-Token': csrfToken  // HANDLED by sveltekit automatically
					},
					body: JSON.stringify({ answerID: answerID, uid: $user?.uid })
				});

				if (response.status !== 200) {
					const { message } = await response.json();
					throw new Error(message);
				}
				selectedAnswer = answerID;
			} catch (e) {
				console.error(e.message);
			}
		}, 1);
	}
</script>

<AuthCheck>
	{#if $game?.players}<PlayerList players={$game.players} />{/if}

	<h1 class="text-center m-4">Játék {data.gameid}</h1>
	{#if $game?.isLive && $game?.question && $game?.turn > 0}
		<h2 class="text-center m-4">{$game.turn}. kérdés</h2>
		<h3 class="text-center m-4">{$game.question.question}</h3>
		<div class="flex flex-col">
			{#each $game.question.answers as answer}
				<button
					class="btn {selectedAnswer === answer.id
						? 'variant-filled-success'
						: 'variant-ringed-tertiary'} m-4"
					on:click={() => sendAnwer(answer.id)}>{answer.value}</button
				>
			{/each}
		</div>
		<RemainingTimeCounter {remainingSeconds} maxSeconds={turnLengthSeconds} />
	{:else if $game?.turn === 0}
		<h2 class="text-center">A játék még nem kezdődött el.</h2>

		<div class="flex flex-row items-center justify-center pt-20">
			<p class="mr-4">Jelezd ha készen állsz:</p>
			<button
				class="chip {isReady ? 'variant-filled-primary' : 'variant-soft-primary'}"
				on:click={changeReadyStatus}
			>
				{#if isReady}<span>&#x2713;</span>{/if}
				<span>Kész</span>
			</button>
		</div>
	{:else}
		<h2 class="text-center">A játék véget ért!</h2>
	{/if}
</AuthCheck>
