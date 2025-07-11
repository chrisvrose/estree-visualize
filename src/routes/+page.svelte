<script lang="ts">
	import { parseJSModule } from '$lib/parse';
	
	let sourceString = $state('');
	// $inspect(s);
	const [derivedASTString,derivedAST,error] = $derived.by(() => {
		return getASTStringFromSource();

		function getASTStringFromSource() {
			let finalRes: string = '';
			let finalAST = null;
			let error;
			try {
				const x = parseJSModule(sourceString);
				finalRes = JSON.stringify(x, undefined, 1);
				error = null;
			} catch (e) {
				error = String(e);
				finalRes = '';
			}
			return [finalRes,finalAST,error];
		}
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<textarea placeholder="Enter a javascript module" bind:value={sourceString}> </textarea>

<textarea readonly value={derivedAST}></textarea>

{#if error!==null}
	<div>{error}</div>
{/if}