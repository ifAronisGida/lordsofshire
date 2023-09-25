<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	export let remainingSeconds: number;
</script>

<div class="absolute bottom-0 right-0 m-5">
	<ProgressRadial
		value={remainingSeconds * 100}
		stroke={100}
		meter="stroke-primary-500"
		track="stroke-primary-500/30">{remainingSeconds}</ProgressRadial
	>
</div>
