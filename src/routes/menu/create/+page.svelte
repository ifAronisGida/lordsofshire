<script lang="ts">
	import type { PageData } from './$types';
	import { user, auth } from '$lib/firebase';

	export let data: PageData;
</script>

<h2 class="card-title m-4 p-4">Játék indítása</h2>
<p class="m-4">beállítások...</p>
<p class="m-4">{$user?.uid}</p>
<button class="btn variant-filled-primary m-4 p-4">Indítás</button>
