export interface ITabIndexer {
  (strings:TemplateStringsArray, num?:number, numerator?:number):number
  setChecker(stringsOrFn:TemplateStringsArray|ICheckerFunction, fn?:ICheckerFunction):void
  clearChecker(strings?:TemplateStringsArray):void
}
export interface ICheckerFunction {
  (currentValue: number, numerator:number):number|boolean
  (context: string, currentValue: number, numerator:number):number|boolean

}
export interface IHashTable {
  [key: string]: any;
}
