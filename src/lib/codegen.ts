import {generate} from 'escodegen'



export function generateCode(inputAST:string):[string,string|null]{
    try{
        const genCode = generate(JSON.parse(inputAST))
        return [genCode,null]
    } catch (e){
        return ['',String(e)];
    }
}