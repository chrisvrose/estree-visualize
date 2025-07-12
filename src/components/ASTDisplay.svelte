<script lang="ts">
	import type { Program } from "estree";
	import { TreeNode } from "$lib/d3adapter";
    type ASTDisplayProps = {
        ast: Program|null
    };
    let {ast}:ASTDisplayProps = $props();
    let d3svg:SVGElement;

    // $inspect(ast);
    const [x,y,z] = $derived(TreeNode.create(ast));
    $inspect(x,y,z);

    import '@xyflow/svelte/dist/style.css';
	import { Background, SvelteFlow } from "@xyflow/svelte";

</script>


<span>AST</span>
<p></p>
<p>{JSON.stringify(y)}</p>
<div style:width="40vw" style:height="40vh">

    <SvelteFlow aria-readonly={true} nodes={y} edges={z}>
        <Background></Background>
    </SvelteFlow>
</div>