import { parseModule } from 'esprima'


function parseJSModuleDeep(x: string) {
	return parseModule(x, { range: true , comment: true});
}
function parseJSModuleLight(x:string){
	return parseModule(x);
}

export function getASTStringFromSource(sourceString: string) {
	let finalASTString: string = '';
	let finalAST = null;
	let error = null;

	try {
		const ast = parseJSModuleDeep(sourceString);
		finalAST = ast;
		finalASTString = JSON.stringify(parseJSModuleLight(sourceString), undefined, 1);
	} catch (e) {
		error = String(e);
		finalASTString = '';
	}
	return [finalASTString, finalAST, error] as const;
}

export function isAnyError(errorString: string | null) {
	return !!errorString;
}