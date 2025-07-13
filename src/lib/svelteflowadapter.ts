import type { Edge, Node as SvelteFlowNode } from '@xyflow/svelte';
import ESTraverse from 'estraverse';
import type { Node, Program } from 'estree';

type NodeData = {
    node: Node,
    label: string,
    loc: Node['loc'],
    parentNodeLabel: string|null
}

export function createSvelteFlowGraph(program: Program | null): [SvelteFlowNode[], Edge[]] {
    if (program === null) return [[], []] as const;
    let nodeIdNum: number = 1;
    let edgeNum = 1;
    const nodeLabelMap = new WeakMap<Node, string>();
    const svNodes: SvelteFlowNode[] = [];
    const svEdges: Edge[] = [];
    ESTraverse.traverse(program, {
        enter(node, parentNode) {
            const nodeId = (nodeIdNum++).toString() + node.type;
            nodeLabelMap.set(node, nodeId);
            const nodeData:NodeData = { node, label: node.type, loc: node.loc,parentNodeLabel: null }
            svNodes.push({
                data: nodeData,
                id: nodeId,
                position: { x: 0, y: 0 }
            })
            if (parentNode !== null) {
                const parentNodeLabel = nodeLabelMap.get(parentNode);
                if (parentNodeLabel === undefined) {
                    throw new Error("ESTraverse made incorrect move");
                }

                svEdges.push(
                    {
                        id: (edgeNum++).toString() + parentNodeLabel,
                        target: nodeId,
                        source: parentNodeLabel
                    });
                // FIXME - this sets the data in the array as well
                nodeData.parentNodeLabel = parentNodeLabel;
            }
        }
    })

    return [svNodes, svEdges] as const;
}
