<script lang="ts">
	import type { GameData } from '$lib/types/game';

	export let players: GameData['players'];
</script>

<div class="absolute bottom-0 bg-neutral text-neutral-content m-5">
	<div class="items-center text-center">
		{#each players as player}
			<div class="flex flex-col items-center">
				<div class="text-xs">{player.username}: {player.score} pont</div>
			</div>
		{/each}
	</div>
</div>
