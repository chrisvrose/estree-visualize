<script lang="ts">
	import type { Program } from 'estree';
	import { createSvelteFlowGraph } from '$lib/svelteflowadapter';
	import {
		Background,
		SvelteFlow,
		Panel,
		useSvelteFlow,
		type Edge,
		type Node,
		MiniMap,

		Controls

	} from '@xyflow/svelte';
	import Dagre from '@dagrejs/dagre';
	import '@xyflow/svelte/dist/style.css';

	import { type Node as ESNode } from 'estree';
	import { userSelectionStore } from '$lib/state/selection.svelte';

	type ASTDisplayProps = {
		ast: Program | null;
	};

	let { ast }: ASTDisplayProps = $props();

	const { fitView } = useSvelteFlow();

	let [nodes, edges] = $derived(getLayoutedElements(...createSvelteFlowGraph(ast)));

	$inspect($userSelectionStore);
	function getLayoutedElements(nodes: Node[], edges: Edge[]): [Node[], Edge[]] {
		if (nodes.length === 0) {
			return [nodes, edges];
		}

		const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

		g.setGraph({});

		edges.forEach((edge) => g.setEdge(edge.source, edge.target));
		nodes.forEach((node) =>
			g.setNode(node.id, {
				...node,
				width: node.width ?? 150,
				height: node.height ?? 75
			})
		);

		Dagre.layout(g);
		return [
			nodes.map((node) => {
				const position = g.node(node.id);
				// We are shifting the dagre node position (anchor=center center) to the top left
				// so it matches the Svelte Flow node anchor point (top left).
				const x = position.x - (node.measured?.width ?? 0) / 2;
				const y = position.y - (node.measured?.height ?? 0) / 2;

				return {
					...node,
					position: { x, y }
				};
			}),
			edges
		];
	}
	function onLayout() {
		const [newNodes, newEdges] = getLayoutedElements(nodes, edges);
		nodes = [...newNodes];
		edges = [...newEdges];
		fitView();
	}
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
		<Panel position="top-right">
			<nav class="btn-group preset-outlined-surface-200-800 flex-col p-2 md:flex-row">
				<button onclick={onLayout} type="button" class="btn">Refit</button>
			</nav>
		</Panel>
		<MiniMap nodeStrokeWidth={3} />
		<Controls />
		<Background bgColor="light-dark(var(--body-background-color),var(--body-background-color-dark))"></Background>
	</SvelteFlow>
</div>
