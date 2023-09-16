<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { user } from '$lib/firebase';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	export let data;

	function submitOnChange(e: any) {
		e.target.form.submit();
	}
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/" class="text-xl uppercase">SZKK</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if $user}<a class="btn btn-base variant-ghost-surface" href="/menu"> Játék </a>{/if}
				<a class="btn btn-base variant-ghost-surface" href="/login"> Fiók </a>
				<a class="btn btn-base variant-ghost-surface" href="/"> Főoldal </a>
				<form method="POST" action="/set-lang?/setLang" use:enhance>
					<select
						class="select rounded-full"
						on:change={submitOnChange}
						name="lang"
						bind:value={data.lang}
					>
						<option value="hu">HU</option>np
					</select>
				</form>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
