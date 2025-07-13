
<script lang="ts">
	import { isAnyError } from "$lib/parse";

    type ErrorBoxProps = {
        error:string|null
    };
    let {error}:ErrorBoxProps = $props();

</script>

<div>
    {#if isAnyError(error)}
        <div>{error}</div>
    {/if}
</div>