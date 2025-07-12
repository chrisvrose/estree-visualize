import type { Edge, Node as SvNode } from '@xyflow/svelte';
import * as d3 from 'd3';
import ESTraverse from 'estraverse';
import type { Node, Program } from 'estree';


export class TreeNode {
    static create(program: Program | null):[TreeNode|null,SvNode[],Edge[]] {
        if (program===null) return [null, [], []] as const;
        let nodeIdNum: number = 1;
        let edgeNum = 1;
        const nodeStack: TreeNode[] = [];
        let poppedNodeThatEmptiedStack: TreeNode | null = null;
        const svNodes: SvNode[] = [];
        const svEdges: Edge[] = [];
        ESTraverse.traverse(program, {
            enter(node) {
                const treeNode = new TreeNode(node, (nodeIdNum++).toString() + node.type);
                if (nodeStack.length > 0) {
                    console.log("Got here", nodeStack)
                    const treeNodeParent = nodeStack[nodeStack.length - 1];
                    treeNodeParent.appendChild(treeNode);
                    svNodes.push({
                        data: { treeNode: treeNode },
                        id: treeNode.id,
                        
                        position: { x: 0, y: 0 }
                    })
                    svEdges.push(
                        {
                            id: (edgeNum++).toString(),
                            target: treeNode.id,
                            source: treeNodeParent.id
                        });
                }
                nodeStack.push(treeNode);
            }, leave(node) {
                const popped = nodeStack.pop();
                if (popped?.estreeNode !== node) {
                    console.error("Error reconciling");
                }
                if (popped === undefined) {
                    console.error("How did we get here")
                } else {
                    poppedNodeThatEmptiedStack = popped;
                }
            }
        })

        if (poppedNodeThatEmptiedStack === null) {
            throw Error("No");
        }
        return [poppedNodeThatEmptiedStack, svNodes, svEdges] as const;
    }
    constructor(private readonly estreeNode: Node, public readonly id: string, private readonly children: TreeNode[] = []) { };
    appendChild(child: TreeNode) {
        this.children.push(child);
    }
}


export function constructASTTreeNode(ast: Program): TreeNode {
    const root = d3.hierarchy(ast)

}