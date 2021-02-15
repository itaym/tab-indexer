import { ITabIndexer, IHashTable, checkerFunction } from "./module";

const tabIndexer = function ():ITabIndexer {

    const contexts:IHashTable = {}
    const numerators:IHashTable = {}
    const checkerFunction:() => boolean = function () { return true }
    let checker: (context: string, currentValue: number, numerator: number) => boolean|number = checkerFunction

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
        if (!isNaN(checkerResult as number) && checkerResult < 0) {
            return checkerResult as number
        }
        if (checkerResult !== 0 && !checkerResult) {
            return -1
        }
        return contexts[context] += numerators[context]
    }
    indexer.setChecker = function (fn:checkerFunction):void {
        checker = fn
    }
    indexer.clearChecker = function ():void {
        checker = checkerFunction
    }
    return indexer
}
export default tabIndexer()