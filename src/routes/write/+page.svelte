<script lang="ts">
	import { generateCode } from '$lib/codegen';
	import CodeMirror from 'svelte-codemirror-editor';
	import MainBoxes from '../../components/AppBox.svelte';
	import { oneDark } from '@codemirror/theme-one-dark';
	import CodeGenOutputTabs from '../../components/write/CodeGenOutputTabs.svelte';
	import { json } from '@codemirror/lang-json';

	let source = $state('');

	let [codeGen, errors] = $derived(generateCode(source));
</script>

<svelte:head>
	<title>estree-viz | CodeGen</title>
</svelte:head>
<MainBoxes>
	{#snippet left()}
		<CodeMirror placeholder="ESTree JSON Object" bind:value={source} theme={oneDark} class="border-surface-500 border-1"
        lang={json()} basic
		></CodeMirror>
	{/snippet}

	{#snippet right()}
        <CodeGenOutputTabs error={errors} genCode={codeGen}></CodeGenOutputTabs>
	{/snippet}
</MainBoxes>
