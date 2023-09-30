<script lang="ts">
	import { ProgressRadial, ProgressBar } from '@skeletonlabs/skeleton';
	import Device from 'svelte-device-info';

	export let remainingSeconds: number;
	export let maxSeconds: number;
</script>

{#if !Device.isMobile}
	<div class="absolute bottom-5 right-5 m-5">
		<ProgressRadial
			value={remainingSeconds > 0 ? 100 - remainingSeconds * (100 / maxSeconds) : undefined}
			stroke={20}
			meter="stroke-warning-500"
			track="stroke-tertiary-500/30"
			>{remainingSeconds}
		</ProgressRadial>
	</div>
{:else}
	<div class="mt-10">
		<ProgressBar max={maxSeconds} value={remainingSeconds > 0 ? remainingSeconds : undefined} />
	</div>
{/if}
