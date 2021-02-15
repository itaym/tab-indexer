import { ITabIndexer, IHashTable } from "./module";

const tabIndexer = function ():ITabIndexer {

    const contexts:IHashTable = {}
    const numerators:IHashTable = {}
    const checkerFunction:Function = function () { return true }
    let checker:Function = checkerFunction

    const indexer = (strings:TemplateStringsArray, num?:number, numerator?:number):number => {
        const context:string = strings.join('')
        if (contexts[context] === undefined) {
            contexts[context] = 0
            numerators[context] = 1
        }
        if (numerator !== undefined) {
            numerators[context] = numerator
        }
        if (num !== undefined) {
            return contexts[context] = num
        }
        const checkerResult = checker(context, contexts[context], numerators[context])
        if (!isNaN(checkerResult) && checkerResult < 0) {
            return checkerResult
        }
        if (checkerResult !== 0 && !checkerResult) {
            return -1
        }
        return contexts[context] += numerators[context]
    }
    indexer.setChecker = function (fn:Function):void {
        checker = fn
    }
    indexer.clearChecker = function ():void {
        checker = checkerFunction
    }
    return indexer
}
export default tabIndexer()