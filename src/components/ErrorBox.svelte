
<script lang="ts">
    type ErrorBoxProps = {
        error:string|null
    };
    let {error}:ErrorBoxProps = $props();

</script>

<div>
    {#if error!==null}
        <div>{error}</div>
    {/if}
</div>