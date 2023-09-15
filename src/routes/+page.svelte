<script>
	import CrownSVG from '$lib/components/CrownSVG.svelte';
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">Helló SzKK (Szent Korona Kereső)</h2>
		<!-- Animated Logo -->
		<div class="animate-bounce">
			<div class="img-bg" />
			<div class="">
				<CrownSVG />
			</div>
		</div>
		<!-- / -->
		<div class="flex justify-center space-x-2">
			<a class="btn variant-filled" href="/game"> JÁTÉK </a>
		</div>
	</div>
</div>

<style lang="postcss">
	.img-bg {
		@apply w-32 h-32 md:w-40 md:h-40;
	}
	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation: pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite, glow 5s linear infinite;
	}
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
