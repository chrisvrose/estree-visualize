<script lang="ts">
	import { getASTStringFromSource } from '$lib/parse';
	import CodeMirror from 'svelte-codemirror-editor';
	import {javascript} from '@codemirror/lang-javascript'
	import OutputTab from '../components/OutputTab.svelte';

	let sourceString = $state('');

	const [derivedASTString, derivedAST, error] = $derived(getASTStringFromSource(sourceString));
</script>



<h2 class="h2">estree-visualizer</h2>
<div class="p-2"></div>

<div class="grid grid-cols-1 md:grid-cols-2 min-h-screen">
	<div style="grid-column: 1 " class="p-1" >
		<CodeMirror class="border-1" bind:value={sourceString} lang={javascript()} placeholder="Javascript code" basic={true} ></CodeMirror>
	</div>
	<div class="grid grid-cols-1 p-1" style="grid-column: 2" >
		<OutputTab error={error} sourceAST={derivedAST} sourceASTString={derivedASTString} />
	</div>
</div>


