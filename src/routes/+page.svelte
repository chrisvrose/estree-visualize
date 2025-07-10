<script lang="ts">
	import { parseJSModule } from '$lib/parse';

	let s = $state('');
	// $inspect(s);
	const derivedAST = $derived.by(() => {
		let finalRes: string = '';
		try {
			const x = parseJSModule(s);
            finalRes = JSON.stringify(x,undefined,1);
		} catch (e){
            finalRes = String(e);
        }
        return finalRes;
	});
	
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<textarea placeholder="Enter a javascript module" bind:value={s}> </textarea>

<textarea readonly value={derivedAST}></textarea>
