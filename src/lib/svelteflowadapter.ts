import type { Edge, Node as SvelteFlowNode } from '@xyflow/svelte';
import ESTraverse from 'estraverse';
import type { Node, Program } from 'estree';

type NodeData = {
    node: Node,
    label: string,
    range: Node['range'],
    parentNodeLabel: string | null
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
            const newNode: SvelteFlowNode = getNewSvelteFlowNode(nodeId, node);
            svNodes.push(newNode)
            if (parentNode !== null) {
                const parentNodeLabel = nodeLabelMap.get(parentNode);
                if (parentNodeLabel === undefined) {
                    throw new Error("ESTraverse made incorrect move");
                }
                const usingEdgeNum = edgeNum++;
                const newEdge = getEdgeBasedOnNodeAndParent(usingEdgeNum, parentNodeLabel, nodeId, node, parentNode);
                svEdges.push(newEdge);
                newNode.data.parentNodeLabel = parentNodeLabel;
            }
        }
    })

    return [svNodes, svEdges] as const;
}
function getNewSvelteFlowNode(nodeId: string, node: Node): SvelteFlowNode {
    const nodeData: NodeData = { node, label: node.type, range: node.range, parentNodeLabel: null }

    const newNode: SvelteFlowNode = {
        data: nodeData,
        id: nodeId,
        position: { x: 0, y: 0 },
        deletable: false
    };
    switch (node.type) {
        case 'Literal':
            newNode.data.label += ` (${node.value})`;
            break;
        case 'Identifier':
            newNode.data.label += ` (${node.name})`;
            break;
        case 'FunctionExpression':
            break;
        case 'BinaryExpression':
            newNode.data.label += ` (${node.operator})`;
            break;


    }
    return newNode;
}

function getEdgeBasedOnNodeAndParent(edgeNum: number, parentNodeLabel: string, nodeId: string, _node: Node, _parentNode: Node): Edge {
    const data: Edge = {
        id: (edgeNum).toString() + parentNodeLabel,
        target: nodeId,
        source: parentNodeLabel,
        deletable: false
    };
    return data
}

