<script lang="ts">
	import { getASTStringFromSource } from '$lib/parse';
	import ErrorBox from '../components/ErrorBox.svelte';

	let sourceString = $state('');
	// $inspect(s);
	const [derivedASTString, derivedAST, error] = $derived(getASTStringFromSource(sourceString));
</script>



<h1 class="h1">Welcome to Pain</h1>

<div class="grid grid-cols-1 md:grid-cols-2 ">
	<div style="grid-column: 1">
		<textarea class="w-full box-border" placeholder="Enter a javascript module" bind:value={sourceString}> </textarea>
	</div>
	<div class="grid grid-cols-1" style="grid-column: 2">
		<div>
			<textarea class="w-full box-border" readonly value={derivedASTString}></textarea>
		</div>
		<ErrorBox error={error}/>
	</div>
</div>


