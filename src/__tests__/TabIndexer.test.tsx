import tabIndexer from "../index";
import {ICheckerFunction} from "../module";

describe('tabIndexer function ', () => {
    test('it returns values according to context as expected with no init values ', () => {
        expect(tabIndexer`context1`).toBe(1);
        expect(tabIndexer`context2`).toBe(1);
        expect(tabIndexer`context3`).toBe(1);
        expect(tabIndexer`context1`).toBe(2);
        expect(tabIndexer`context2`).toBe(2);
        expect(tabIndexer`context3`).toBe(2);
        expect(tabIndexer`context1`).toBe(3);
        expect(tabIndexer`context2`).toBe(3);
        expect(tabIndexer`context3`).toBe(3);
    });
    test('it returns values according to context as expected with only init value ', () => {
        expect(tabIndexer`context1${1}`).toBe(1);
        expect(tabIndexer`context2${2}`).toBe(2);
        expect(tabIndexer`context3${3}`).toBe(3);
        expect(tabIndexer`context1`).toBe(2);
        expect(tabIndexer`context2`).toBe(3);
        expect(tabIndexer`context3`).toBe(4);
        expect(tabIndexer`context1`).toBe(3);
        expect(tabIndexer`context2`).toBe(4);
        expect(tabIndexer`context3`).toBe(5);
    });
    test('it returns values according to context as expected with init value and numerator ', () => {
        expect(tabIndexer`context1${1}${2}`).toBe(1);
        expect(tabIndexer`context2${3}${4}`).toBe(3);
        expect(tabIndexer`context3${5}${6}`).toBe(5);
        expect(tabIndexer`context1`).toBe(3);
        expect(tabIndexer`context2`).toBe(7);
        expect(tabIndexer`context3`).toBe(11);
        expect(tabIndexer`context1`).toBe(5);
        expect(tabIndexer`context2`).toBe(11);
        expect(tabIndexer`context3`).toBe(17);
    });
});

describe('tabIndexer function setChecker and clearChecker ', () => {
    const checkerFn = (context:string, currentValue:number, numerator:number) => {
        if (context !== 'context1') return false
        if ((currentValue || 0) + (numerator || 0) > 99) return false
        if ((numerator || 0) % 2) return -1
        return 1
    }
    test('it returns values according to context as expected with no init values ', () => {
        tabIndexer.setChecker(checkerFn as ICheckerFunction)
        expect(tabIndexer`context1${0}${50}`).toBe(0)
        expect(tabIndexer`context1`).toBe(50)
        expect(tabIndexer`context1`).toBe(-1)
        expect(tabIndexer`context2${2}${1}`).toBe(2)
        expect(tabIndexer`context2`).toBe(-1)
        expect(tabIndexer`context2`).toBe(-1)
        expect(tabIndexer`context1${0}${49}`).toBe(0)
        expect(tabIndexer`context1`).toBe(-1)
    });
    test('it returns values according to context as expected after clearChecker ', () => {
        tabIndexer.clearChecker()
        expect(tabIndexer`context1${0}${50}`).toBe(0)
        expect(tabIndexer`context1`).toBe(50)
        expect(tabIndexer`context1`).toBe(100)
        expect(tabIndexer`context2${2}${1}`).toBe(2)
        expect(tabIndexer`context2`).toBe(3)
        expect(tabIndexer`context2`).toBe(4)
        expect(tabIndexer`context1${0}${49}`).toBe(0)
        expect(tabIndexer`context1`).toBe(49)
    });
});
describe('tabIndexer function setChecker and clearChecker per context ', () => {
    const checkerFn = (currentValue:number, numerator:number) => {
        if ((currentValue || 0) + (numerator || 0) > 99) return false
        if ((numerator || 0) % 2) return -1
        return 1
    }
    test('it returns values according to context as expected with no init values ', () => {
        tabIndexer.setChecker`checkedContext${checkerFn as ICheckerFunction}`
        expect(tabIndexer`checkedContext${0}${50}`).toBe(0)
        expect(tabIndexer`checkedContext`).toBe(50)
        expect(tabIndexer`checkedContext`).toBe(-1)
        expect(tabIndexer`checkedContext2${2}${1}`).toBe(2)
        expect(tabIndexer`checkedContext2`).toBe(3)
        expect(tabIndexer`checkedContext2`).toBe(4)
        expect(tabIndexer`checkedContext${0}${49}`).toBe(0)
        expect(tabIndexer`checkedContext`).toBe(-1)
    });
    test('it returns values according to context as expected after clearChecker ', () => {
        tabIndexer.clearChecker`checkedContext`
        expect(tabIndexer`checkedContext${0}${50}`).toBe(0)
        expect(tabIndexer`checkedContext`).toBe(50)
        expect(tabIndexer`checkedContext`).toBe(100)
        expect(tabIndexer`context2${2}${1}`).toBe(2)
        expect(tabIndexer`context2`).toBe(3)
        expect(tabIndexer`context2`).toBe(4)
        expect(tabIndexer`checkedContext${0}${49}`).toBe(0)
        expect(tabIndexer`checkedContext`).toBe(49)
    });
});