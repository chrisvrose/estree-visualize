<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';
	import { EditorView } from 'codemirror';
	import { EditorSelection } from '@codemirror/state';
	import { javascript } from '@codemirror/lang-javascript';
	import { userSelectionStore } from '$lib/state/selection.svelte';
	import { onMount } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
    import {oneDark} from '@codemirror/theme-one-dark';

	type TextEditorProps = {
		sourceText: string;
	};

	let { sourceText = $bindable() }: TextEditorProps = $props();

	let selectionStoreUnsubscriber: Unsubscriber | undefined = $state.raw();
	function onEditorViewReady(e: EditorView) {
		selectionStoreUnsubscriber = userSelectionStore.subscribe((val) => {
			const editorSelection = val === undefined ? undefined : EditorSelection.range(val[0], val[1]);
			e.dispatch({
				selection: editorSelection
			});
		});
	}

	onMount(() => {
		return () => {
			selectionStoreUnsubscriber?.();
		};
	});
</script>

<CodeMirror
	class="border-surface-500 border-1"
	bind:value={sourceText}
	lang={javascript()}
	placeholder="Javascript code"
	on:ready={(e) => {
		onEditorViewReady(e.detail);
	}}
    theme={oneDark}
></CodeMirror>
