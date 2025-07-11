import {parseModule} from 'esprima'


function parseJSModule(x:string){
    return parseModule(x);
}
export function getASTStringFromSource(sourceString:string) {
			let finalASTString: string = '';
			let finalAST = null;
			let error;
			try {
				const ast = parseJSModule(sourceString);
                finalAST = ast;
				finalASTString = JSON.stringify(ast, undefined, 1);
				error = null;
			} catch (e) {
				error = String(e);
				finalASTString = '';
			}
			return [finalASTString,finalAST,error] as const;
		}