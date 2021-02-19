import { ITabIndexer, IHashTable, ICheckerFunction } from "./module";

const tabIndexer = function ():ITabIndexer {

    enum CHECKER_TYPE {
        GLOBAL_CHECKER = 0,
        CONTEXT_CHECKER = 1
    }
    const contexts:IHashTable = {}
    const numerators:IHashTable = {}
    const checkerFns:IHashTable = {}
    const checkerFunction:ICheckerFunction = function () { return true }
    let checker:ICheckerFunction = checkerFunction

    function executeChecker(
        checkerType:CHECKER_TYPE,
        checkerFn:ICheckerFunction,
        context:string,
        currentValue:number,
        numerator:number):boolean {
        const checkerResult = checkerType === CHECKER_TYPE.GLOBAL_CHECKER ?
            checkerFn(context, currentValue, numerator) :
            checkerFn(currentValue, numerator)

        if (!isNaN(checkerResult as number) && checkerResult < 0) {
            return false
        }
        return !(checkerResult !== 0 && !checkerResult);
    }

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
        if (!checkerFns[context]) {
            checkerFns[context] = checkerFunction
        }
        if (!executeChecker(
            CHECKER_TYPE.GLOBAL_CHECKER, checker, context, contexts[context], numerators[context])) {
            return -1
        }
        if (!executeChecker(
            CHECKER_TYPE.CONTEXT_CHECKER, checkerFns[context], context, contexts[context], numerators[context])) {
            return -1
        }
        return contexts[context] += numerators[context]
    }
    indexer.setChecker = function (stringsOrFn:TemplateStringsArray|ICheckerFunction, fn?:ICheckerFunction):void {
        if (stringsOrFn instanceof Function) {
            checker = stringsOrFn
            return
        }
        const context:string = stringsOrFn.join('')
        checkerFns[context] = fn
    }
    indexer.clearChecker = function (strings?:TemplateStringsArray):void {
        if (strings) {
            const context:string = strings.join('')
            checkerFns[context] = checkerFunction
        }
        checker = checkerFunction
    }
    return indexer
}
export default tabIndexer()