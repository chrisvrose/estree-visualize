<script lang="ts">
	import { AppBar, Modal } from '@skeletonlabs/skeleton-svelte';
	import type { Snippet } from 'svelte';
	import ExtLinkIcon from '@lucide/svelte/icons/external-link';
	import MenuIcon from '@lucide/svelte/icons/menu';
	type MainBoxProps = {
		left: Snippet;
		right: Snippet;
	};
	const { left, right }: MainBoxProps = $props();

	let isdrawerOpen = $state(false);
</script>

<AppBar>
	{#snippet lead()}
		<h2 class="h2">estree-visualizer</h2>
	{/snippet}
	{#snippet trail()}
		<div class="flex hidden place-items-center sm:flex">
			<div class="my-auto flex-initial">
				<a href="/" class="btn hover:preset-tonal">Parse</a>
			</div>
			<div class="my-auto">
				<a href="/write" class="btn hover:preset-tonal">CodeGen</a>
			</div>
			<div class="my-auto">
				<a
					class="btn hover:preset-tonal"
					href="https://philipflyvholm.github.io/estree-explorer/"
					target="_blank"
					rel="noopener">Explore <ExtLinkIcon class="inline"></ExtLinkIcon></a
				>
			</div>
		</div>

		<div class="flex place-items-center sm:hidden">
			<button
				class="btn"
				onclick={(e) => {
					isdrawerOpen = true;
				}}
			>
				<MenuIcon />
			</button>
		</div>
	{/snippet}
</AppBar>
<div class="p-2"></div>

<div class="grid min-h-screen grid-cols-1 p-2 md:grid-cols-2">
	<div class="col-span-1 p-1">
		{@render left()}
	</div>
	<div class="col-span-1 grid p-1">
		{@render right()}
	</div>
</div>
<Modal
	open={isdrawerOpen}
	onOpenChange={(e) => (isdrawerOpen = e.open)}
	triggerBase="btn preset-tonal"
	contentBase="bg-surface-100-900 p-4 space-y-4 shadow-xl w-[480px] h-screen"
	positionerJustify="justify-start"
	positionerAlign=""
	positionerPadding="pr-16"
	transitionsPositionerIn={{ x: -480, duration: 200 }}
	transitionsPositionerOut={{ x: -480, duration: 200 }}
>
	{#snippet content()}
		<div class="my-auto flex-initial">
			<a href="/" class="btn hover:preset-tonal">Parse</a>
		</div>
		<div class="my-auto">
			<a href="/write" class="btn hover:preset-tonal">CodeGen</a>
		</div>
		<div class="my-auto">
			<a
				class="btn hover:preset-tonal"
				href="https://philipflyvholm.github.io/estree-explorer/"
				target="_blank"
				rel="noopener">Explore <ExtLinkIcon class="inline"></ExtLinkIcon></a
			>
		</div>
	{/snippet}
</Modal>
