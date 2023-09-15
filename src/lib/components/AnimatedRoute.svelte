<script>
  import { fade, fly } from "svelte/transition";
  import { page } from "$app/stores";
</script>

{#key $page.url}
  <div in:fly={{ x: "-100%", duration: 200 }}>
    <slot />
  </div>
{/key}
