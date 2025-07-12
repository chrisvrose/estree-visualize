<script lang="ts">
	import { getASTStringFromSource } from '$lib/parse';
	import CodeMirror from 'svelte-codemirror-editor';
	import ErrorBox from '../components/ErrorBox.svelte';
	import {javascript} from '@codemirror/lang-javascript'
	import TabOutput from '../components/TabOutput.svelte';

	let sourceString = $state('');

	// $inspect(s);
	const [derivedASTString, derivedAST, error] = $derived(getASTStringFromSource(sourceString));
</script>



<h2 class="h2">estree-visualizer</h2>
<div class="p-2"></div>

<div class="grid grid-cols-1 md:grid-cols-2 min-h-screen">
	<div style="grid-column: 1 " class="p-1" >
		<CodeMirror class="border-1" bind:value={sourceString} lang={javascript()} placeholder="Javascript code"></CodeMirror>
		<!-- <textarea class="w-full box-border" placeholder="Enter a javascript module" bind:value={sourceString}> </textarea> -->
	</div>
	<div class="grid grid-cols-1 p-1" style="grid-column: 2" >
		<TabOutput error={error} sourceAST={derivedAST} sourceASTString={derivedASTString} />
	</div>
</div>


