<script lang="ts">
	import type { GameData } from '$lib/types/game';
	import CrownSvg from './CrownSVG.svelte';

	export let players: GameData['players'];
	export let endScreen: boolean = false;

	$: players = players.sort((a, b) => b.score - a.score);
</script>

<div class="{!endScreen ? 'absolute bottom-0' : ''} bg-neutral text-neutral-content m-5">
	<div class="items-center text-center">
		{#each players as player, index}
			<div class="flex flex-col items-center">
				{#if index == 0 && endScreen}
					<div class="animate-bounce"><CrownSvg /></div>
				{/if}
				<div class="text-xs ${index === 0 && endScreen ? 'animate-pulse text-success-200' : ''}">
					{index + 1}. {player.username}: {player.score} pont
				</div>
			</div>
		{/each}
	</div>
</div>
