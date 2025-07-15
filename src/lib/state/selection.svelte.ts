import type { Node } from 'estree'
import { writable, type Writable } from 'svelte/store';


export const userSelectionStore:Writable<Node['range']> = writable(undefined);
