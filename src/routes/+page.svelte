<script lang="ts">
	import { getASTStringFromSource } from '$lib/parse';

	import OutputTab from '../components/parse/ParseOutputTabs.svelte';
	import SelectableTextEditor from '../components/parse/SelectableTextEditor.svelte';
	import MainBoxes from '../components/AppBox.svelte';

	let sourceString = $state('');

	const [derivedASTString, derivedAST, error] = $derived(getASTStringFromSource(sourceString));
</script>

<svelte:head>
	<title>estree-viz | Parse</title>
</svelte:head>
<MainBoxes>
	{#snippet left()}
		<SelectableTextEditor bind:sourceText={sourceString} />
	{/snippet}
	{#snippet right()}
		<OutputTab {error} sourceAST={derivedAST} sourceASTString={derivedASTString} />
	{/snippet}
</MainBoxes>
