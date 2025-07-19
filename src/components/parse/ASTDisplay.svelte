<script lang="ts">
	import type { Program } from 'estree';
	import { createSvelteFlowGraph } from '$lib/svelteflowadapter';
	import { Background, SvelteFlow, MiniMap, Controls } from '@xyflow/svelte';
	import { type Node as ESNode } from 'estree';
	import { userSelectionStore } from '$lib/state/selection.svelte';
	import { doDagreLayout } from '$lib/layout';

	import '@xyflow/svelte/dist/style.css';

	type ASTDisplayProps = {
		ast: Program | null;
	};

	let { ast }: ASTDisplayProps = $props();

	let [nodes, edges] = $derived(doDagreLayout(...createSvelteFlowGraph(ast)));
</script>

<div style:height="80vh" id="something" class="card preset-outlined-surface-500 p-4">
	<SvelteFlow
		class="bg-[#ff0000]"
		aria-readonly={true}
		bind:nodes
		bind:edges
		colorMode="system"
		fitView
		onnodepointerenter={(nodeEvent) => {
			$userSelectionStore = nodeEvent.node.data.range as any as ESNode['range'];
		}}
		onnodepointerleave={() => {
			$userSelectionStore = undefined;
		}}
	>
		<MiniMap nodeStrokeWidth={3} />
		<Controls />
		<Background bgColor="light-dark(var(--body-background-color),var(--body-background-color-dark))"
		></Background>
	</SvelteFlow>
</div>
