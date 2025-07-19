import type { Edge, Node } from "@xyflow/svelte";
import Dagre from "@dagrejs/dagre";

export type doLayout = (nodes: Node[], edges: Edge[]) => [Node[], Edge[]];

export const doDagreLayout: doLayout = (nodes, edges) => {
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