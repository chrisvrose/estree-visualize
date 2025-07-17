<script lang="ts">
	import type { Program } from "estree";
	import ErrorBox from "./ErrorBox.svelte";
    import {Tabs} from '@skeletonlabs/skeleton-svelte'
    import CodeMirror from "svelte-codemirror-editor";
	import { isAnyError } from "$lib/parse";
	import AstDisplay from "./ASTDisplay.svelte";
	import { SvelteFlowProvider } from "@xyflow/svelte";
	import { oneDark } from "@codemirror/theme-one-dark";
    import {json} from '@codemirror/lang-json'
    
    type CurrentTab = 'error'|'ast'|'astString' | string;
    
    type OutputTabProps = {
        sourceAST: Program | null,
        sourceASTString: string | null,
        error: string | null
    }

    const {sourceAST,sourceASTString,error}:OutputTabProps = $props();
    
    let selectedTab:CurrentTab = $state('ast');
</script>

<Tabs value={selectedTab} onValueChange={e=>selectedTab = e.value}>
    {#snippet list()}
        <Tabs.Control value="ast">Graphical AST</Tabs.Control>
        <Tabs.Control value="astString">Textual AST</Tabs.Control>
        <Tabs.Control value="error">Errors {#if isAnyError(error)}
                <span class="badge-icon preset-filled-primary-500 absolute -right-0 -top-0 z-10">!</span>
        {/if}</Tabs.Control>
    {/snippet}
    {#snippet content()}
        <Tabs.Panel value="astString">
            <CodeMirror value={sourceASTString} basic={true} readonly  theme={oneDark} lang={json()}></CodeMirror>
        </Tabs.Panel>
        <Tabs.Panel value="ast">
        <SvelteFlowProvider>
            <AstDisplay ast={sourceAST} />
        </SvelteFlowProvider>
        </Tabs.Panel>
        <Tabs.Panel value="error">
            <ErrorBox error={error}/>
        </Tabs.Panel>
    {/snippet}
</Tabs>