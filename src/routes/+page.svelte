<script lang="ts">
	import { getASTStringFromSource } from '$lib/parse';

	let sourceString = $state('');
	// $inspect(s);
	const [derivedASTString, derivedAST, error] = $derived(getASTStringFromSource(sourceString));
</script>



<h1 class="h1">Welcome to Pain</h1>

<div class="grid grid-cols-1 md:grid-cols-2 ">
	<div style="grid-column: 1">
		<textarea class="w-100" placeholder="Enter a javascript module" bind:value={sourceString}> </textarea>
	</div>
	<div class="grid grid-cols-1" style="grid-column: 2">
		<div>
			<textarea class="w-100" readonly value={derivedASTString}></textarea>
		</div>
		<div>
			{#if error !== null}
				<div>{error}</div>
			{/if}
		</div>
	</div>
</div>


