<script lang="ts">
	import { AppBar } from "@skeletonlabs/skeleton-svelte";
import type { Snippet } from "svelte";
import ExtLinkIcon from "@lucide/svelte/icons/external-link";

type MainBoxProps = {
    left: Snippet,
    right: Snippet
}
const {left,right}:MainBoxProps = $props();

</script>


<AppBar>
	{#snippet lead()}
	<h2 class="h2">
		estree-visualizer
	</h2>
	{/snippet}
	{#snippet trail()}

		<div class="flex place-items-center">
			<div class="flex-initial my-auto">
				<a href="/" class='btn hover:preset-tonal'>Parse</a>
			</div>
			<div class="my-auto">
				<a href="/write" class='btn hover:preset-tonal'>CodeGen</a>
			</div>
			<div class="my-auto">
				<a class='btn hover:preset-tonal' href="https://philipflyvholm.github.io/estree-explorer/" target="_blank" rel="noopener">Explore <ExtLinkIcon class="inline"></ExtLinkIcon></a>
			</div>

		</div>
			
	{/snippet}
</AppBar>
<div class="p-2"></div>


<div class="grid grid-cols-1 md:grid-cols-2 min-h-screen p-2">
	<div class="p-1 col-span-1 " >
        {@render left()}
	</div>
	<div class="grid p-1 col-span-1">
        {@render right()}
	</div>
</div>
