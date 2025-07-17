<script lang="ts">
	import type { Program } from 'estree';
	import ErrorBox from './ErrorBox.svelte';
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
	import CodeMirror from 'svelte-codemirror-editor';
	import { isAnyError } from '$lib/parse';
	import AstDisplay from './ASTDisplay.svelte';
	import { SvelteFlowProvider } from '@xyflow/svelte';
	import { oneDark } from '@codemirror/theme-one-dark';
	import { json } from '@codemirror/lang-json';
	import IconNetwork from '@lucide/svelte/icons/network';
	import IconJSON from '@lucide/svelte/icons/file-json-2';
	import IconNoErrorsAlert from '@lucide/svelte/icons/spell-check';
	import IconErrorsAlert from '@lucide/svelte/icons/spell-check-2';

	type CurrentTab = 'error' | 'ast' | 'astString' | string;

	type OutputTabProps = {
		sourceAST: Program | null;
		sourceASTString: string | null;
		error: string | null;
	};

	const { sourceAST, sourceASTString, error }: OutputTabProps = $props();

	let selectedTab: CurrentTab = $state('ast');
</script>

<Tabs value={selectedTab} onValueChange={(e) => (selectedTab = e.value)}>
	{#snippet list()}
		<Tabs.Control value="ast">
			{#snippet lead()}<IconNetwork size={20} />{/snippet}
			Tree</Tabs.Control
		>
		<Tabs.Control value="astString">
			{#snippet lead()}<IconJSON size={20} />{/snippet}
			JSON</Tabs.Control
		>
		<Tabs.Control value="error">
			{#snippet lead()}
				{#if isAnyError(error)}
					<IconErrorsAlert size={20} class="text-error-500" />
				{:else}
					<IconNoErrorsAlert size={20} />
				{/if}
			{/snippet}
			Errors {#if isAnyError(error)}
				<span class="badge-icon preset-filled-error-500 absolute -top-0 -right-0 z-10">!</span>
			{/if}</Tabs.Control
		>
	{/snippet}
	{#snippet content()}
		<Tabs.Panel value="astString">
			<CodeMirror value={sourceASTString} basic={true} readonly theme={oneDark} lang={json()}
			></CodeMirror>
		</Tabs.Panel>
		<Tabs.Panel value="ast">
			<SvelteFlowProvider>
				<AstDisplay ast={sourceAST} />
			</SvelteFlowProvider>
		</Tabs.Panel>
		<Tabs.Panel value="error">
			<ErrorBox {error} />
		</Tabs.Panel>
	{/snippet}
</Tabs>
