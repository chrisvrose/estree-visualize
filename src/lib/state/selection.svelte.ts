import type { Node } from 'estree'
import { writable, type Writable } from 'svelte/store';

export type UserInputContext = {
    input: string
}
export const userInput:UserInputContext = $state({input: ''});

export const userSelectionStore:Writable<Node['range']> = writable();
