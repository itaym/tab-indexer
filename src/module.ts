export interface ITabIndexer {
  (strings:TemplateStringsArray, num?:number, numerator?:number):number
  setChecker(fn:ICheckerFunction):void
  clearChecker():void
}
export type ICheckerFunction =
  (context?: string, currentValue?: number, numerator?:number) => number|boolean

export interface IHashTable {
  [key: string]: number;
}
