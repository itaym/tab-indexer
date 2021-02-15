export interface ITabIndexer {
  (strings:TemplateStringsArray, num?:number, numerator?:number):number
  setChecker(fn:checkerFunction):void
  clearChecker():void
}
export interface checkerFunction {
  (context?: string, currentValue?: number, numerator?:number):number|boolean
}
export interface IHashTable {
  [key: string]: number;
}

// export interface AnyAttrProps extends PropsWithChildren<any> {
//   attributes: IAnyAttrOptions;
// }
