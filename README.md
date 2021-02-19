# tab-indexer
![Coverage Status](https://img.shields.io/badge/coverage-100%25-green) ![License](https://img.shields.io/badge/license-MIT-blue) [![Rate on Openbase](https://badges.openbase.com/js/rating/tab-indexer.svg)](https://openbase.com/js/tab-indexer?utm_source=embedded&utm_medium=badge&utm_campaign=rate-badge)

------------
Setting ``tabIndex`` can be tricky (especially when using React. Components may have a different rendering order, etc). Also in other platforms down to plain HTML, just by adding another element to the page may change the tab order, or the order you may want it to be. So, a lot of attention this seemingly esoteric issue requires.

Lately, I had to build a system which all navigation had to be done with the keyboard alone. Modal had to be opened and close, and many other challenges. ``tabIndex`` needed a lot of maintenance!!! This was the birth of this little useful ``tabIndexer`` utility.

``tabIndexer`` is basically a counter, a context counter that can be initialized (or not). Just a simple counter according to a given context. It cannot get any simpler and efficient then that.

## Installation
`` $ npm install tab-indexer``
## Usage
```HTML
import tabIndexer from "tab-indexer";
```
Examples are in JSX format for convenient. It can be used in any Javascript platform.
```HTML
tabIndexer`context`;
tabIndexer`context${initValue}`;
tabIndexer`context${initValue}${numerator}`;
```
```HTML
const Fn = () =>
    <input ... tabIndex={tabIndexer`context`} /> {/** tabindex="1" */}
    <input ... tabIndex={tabIndexer`context`} /> {/** tabindex="2" */}
```
```HTML
const Fn = () => {
    tabIndexer`context${100}`;
    return (
        <input ... tabIndex={tabIndexer`context`} /> {/** tabindex="101" */}
        <input ... tabIndex={tabIndexer`context`} /> {/** tabindex="102" */}
    );
};
```
```HTML
const Fn = () => {
    tabIndexer`context${0}${100}`;
    return (
        <input ... tabIndex={tabIndexer`context`} /> {/** tabindex="100" */}
        <input ... tabIndex={tabIndexer`context`} /> {/** tabindex="200" */}
        <input ... tabIndex={tabIndexer`other`} /> {/** tabindex="1" */}
    );
};
```
#### Surprise surprise!!! The plot get a bit trickier
Especially in `React` when you open a modal, and you move around with `TAB` or `SHIFT-TAB`. Because elements in the page keep their `tabIndex`, the `focus` navigates through all the elements and not just the elements you set `tabIndex` to in the modal. This is a **big problem**. So setting `tabIndex` to minus will solve this problem. `tabIndecies` with minus are ignored by the browser. This is good but now this little utility does not help because (once again) I have to start program this B.S.
**The solution** for the problem has been found in the manner of a `checker` function that can be passed to the `tabIndexer`. If the `checker` function returns zero or greater or true, `tabIndexer` will continue to do what it does best. **BUT** if the function returns less than zero or false `tabIndexer` will returns **-1**. For this to occur two methods exists: `setChecker` and `clearChecker`.
```HTML
const Fn = () => {
    const checker = (context, currentValue, numerator) => {
        // you can do something with the currentValue and numerator
        // but for this example I'll use only the context
        return context === 'myContext';
    }
    tabIndexer`myContext{0}`;
    tabIndexer.setChecker(checker);
    return (
        <input ... tabIndex={tabIndexer`myContext`} /> {/** tabindex="1" */}
        <input ... tabIndex={tabIndexer`otherContext`} /> {/** tabindex="-1" */}
    );
};
```
```HTML
const Fn = () => {
    // Somewhere else
    tabIndexer.clearChecker();
};    
```
So I put the `setChecker` in the function that opens the modal and the `clearChecker` in the function that closes it.
**PROBLEM SOLVED**
In general, I set for every region of the system a different initial number from small to large. `tabIndex` values don't have to be in sequence, they can jump from 1000 to 2000, and it will work fine.

**For more complex use** of the ``setChecker`` / ``clearChecker``. It may be used regarding a context. In that manner the ``checker`` function receives two parameters: ``currentValue`` and ``numerator``. (Because the ``context`` should be known to it).
The syntax is in ``Tag`` function:
```HTML
const Fn = () => {
    const checker = (currentValue, numerator) => {
        // Let's say we want to skip values
        return ((currentValue + numerator) % 2) -1;
    }
    tabIndexer`myContext{0}`;
    tabIndexer.setChecker`myContext${checker}`;
    return (
        <input ... tabIndex={tabIndexer`myContext`} /> {/** tabindex="1" */}
        <input ... tabIndex={tabIndexer`myContext`} /> {/** tabindex="-1" */}
    );
};    
```
```HTML
const Fn = () => {
    // Somewhere else
    tabIndexer.clearChecker`myContext`;
};    
```
------------
#### Note

The global ``checker`` function is precedence to the ``context`` ``checker`` function.

------------
## Have a good productive day :)

If you like this package please consider donation <a href="https://paypal.me/ItayMerchav?locale.x=en_US" target="_blank">Click Here</a>

---
- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2015 © <a href="http://fvcproductions.com" target="_blank">FVCproductions</a>.