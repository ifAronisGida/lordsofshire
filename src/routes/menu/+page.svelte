<script lang="ts">
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import CrownSVG from '$lib/components/CrownSVG.svelte';
</script>

<AuthCheck>
	<div class="container h-full mx-auto flex justify-center items-center">
		<div class="space-y-10 text-center flex flex-col items-center">
			<div class="h2 mt-4">Csatlakozz játékhoz vagy hozz létre újat!</div>
			<!-- Animated Logo -->
			<div class="hover:animate-spin">
				<div class="img-bg" />
				<div class="">
					<CrownSVG />
				</div>
			</div>
		</div>
	</div>
</AuthCheck>

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
