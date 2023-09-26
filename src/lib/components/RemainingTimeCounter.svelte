<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	export let remainingSeconds: number;
	export let maxSeconds: number;
</script>

<div class="absolute bottom-0 right-0 m-5">
	<ProgressRadial
		value={100 - remainingSeconds * (100 / maxSeconds)}
		stroke={20}
		meter="stroke-warning-500"
		track="stroke-tertiary-500/30">{remainingSeconds}</ProgressRadial
	>
</div>
