<script lang="ts">
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
	import IconNoErrorsAlert from '@lucide/svelte/icons/spell-check';
	import IconErrorsAlert from '@lucide/svelte/icons/spell-check-2';
	import IconCode from '@lucide/svelte/icons/code';
	import { isAnyError } from '$lib/parse';
	import CodeMirror from 'svelte-codemirror-editor';

	import { oneDark } from '@codemirror/theme-one-dark';
	import ErrorBox from '../ErrorBox.svelte';
	import { javascript } from '@codemirror/lang-javascript';
	type CodeGenOutputTabProps = {
		genCode: string;
		error: string | null;
	};

	type CurrentTab = 'error' | 'code' | string;
	let selectedTab: CurrentTab = $state('code');

	const { error, genCode }: CodeGenOutputTabProps = $props();
</script>

<Tabs value={selectedTab} onValueChange={(e) => (selectedTab = e.value)}>
	{#snippet list()}
		<Tabs.Control value="code">
			{#snippet lead()}<IconCode size={20} />{/snippet}
			Code</Tabs.Control
		>
		<Tabs.Control value="error">
			{#snippet lead()}
				{#if isAnyError(error)}
					<IconErrorsAlert size={20} class="text-error-500" />
				{:else}
					<IconNoErrorsAlert size={20} />
				{/if}
			{/snippet}
			Errors {#if isAnyError(error)}
				<span class="badge-icon preset-filled-error-500 absolute -top-0 -right-0 z-10">!</span>
			{/if}</Tabs.Control
		>
	{/snippet}
	{#snippet content()}
		<Tabs.Panel value="code">
			<CodeMirror readonly value={genCode} theme={oneDark} class="border-surface-500 border-1"
			placeholder="Generated JS code"
            basic lang={javascript()}
            ></CodeMirror>
		</Tabs.Panel>
		<Tabs.Panel value="error">
			<ErrorBox {error} />
		</Tabs.Panel>
	{/snippet}
</Tabs>
