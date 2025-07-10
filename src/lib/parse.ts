import {parseModule} from 'esprima'


export function parseJSModule(x:string){
    return parseModule(x);
}