/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(1);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compoments_board__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__compoments_game_info__ = __webpack_require__(9);



class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            historyList: [{
                history: [{
                    squares: Array(Math.pow(5, 2)).fill(null),
                    chengeSquare: 0
                }],
                winner: 0
            }],
            xIsNext: true,
            stepNumber: 0,
            sortAscending: true
        };
    }

    init() {
        const historyList = this.state.historyList.slice(0, this.state.historyList.length);
        const history = historyList[historyList.length - 1].history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let newHistorySeq = historyList.length;
        if (winner || this.state.stepNumber === Math.pow(5, 2)) {
            let result = winner ? current.squares[winner[0]] : "Draw";
            historyList[newHistorySeq - 1] = {
                history: history,
                winner: result
            };
        } else {
            newHistorySeq = newHistorySeq - 1;
        }
        historyList[newHistorySeq] = {
            history: [{
                squares: Array(Math.pow(5, 2)).fill(null),
                chengeSquare: 0
            }],
            winner: "playing"
        };
        historyList.map((history, index) => console.log(index + 1 + ". Result:" + history.winner));
        this.setState({
            historyList: historyList,
            xIsNext: true,
            stepNumber: 0,
            sortAscending: true,
            result: false
        });
    }

    handleClick(i) {
        const historyList = this.state.historyList.slice(0, this.state.historyList.length);
        const history = historyList[historyList.length - 1].history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        historyList[historyList.length - 1] = {
            history: history.concat([{
                squares: squares,
                chengeSquare: i
            }]),
            winner: 0
        };

        this.setState({
            historyList: historyList,
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 === 0
        });
    }

    onToggle(value) {
        this.setState({
            sortAscending: !value
        });
    }

    render() {
        const historyList = this.state.historyList;
        const history = historyList[historyList.length - 1].history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        return React.createElement(
            'div',
            { key: 'game', className: 'game' },
            React.createElement(
                'div',
                { key: 'game-board', className: 'game-board' },
                React.createElement(__WEBPACK_IMPORTED_MODULE_0__compoments_board__["a" /* default */], { key: 'board',
                    squares: current.squares,
                    onClick: i => this.handleClick(i),
                    victoryLine: winner
                })
            ),
            React.createElement(
                'div',
                { key: 'game-info', className: 'game-info' },
                React.createElement(
                    'button',
                    { onClick: () => this.init() },
                    'New Game'
                ),
                React.createElement(__WEBPACK_IMPORTED_MODULE_1__compoments_game_info__["a" /* default */], { key: 'info',
                    history: history,
                    winner: winner,
                    stepNumber: this.state.stepNumber,
                    xIsNext: this.state.xIsNext,
                    sortAscending: this.state.sortAscending,
                    onClickList: step => this.jumpTo(step),
                    onToggle: value => this.onToggle(value)
                })
            )
        );
    }
}

ReactDOM.render(React.createElement(Game, null), document.getElementById('root'));

function calculateWinner(squares) {
    // const lines = [
    //     [0, 1, 2],
    //     [3, 4, 5],
    //     [6, 7, 8],
    //     [0, 3, 6],
    //     [1, 4, 7],
    //     [2, 5, 8],
    //     [0, 4, 8],
    //     [2, 4, 6],
    // ];
    // for (let i = 0; i < lines.length; i++) {
    //     const [a, b, c] = lines[i];
    //     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
    //         return lines[i];
    //     }
    // }
    const lines = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19], [20, 21, 22, 23, 24], [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24], [0, 6, 12, 18, 24], [4, 8, 12, 16, 20]];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c, d, e] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e]) {
            return lines[i];
        }
    }
    return null;
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__square__ = __webpack_require__(8);


class Board extends React.Component {
    renderSquare(i) {
        const isHighlight = this.props.victoryLine ? this.props.victoryLine.indexOf(i) >= 0 : false;
        return React.createElement(__WEBPACK_IMPORTED_MODULE_0__square__["a" /* Square */], {
            key: i,
            index: i,
            value: this.props.squares[i],
            highlight: isHighlight,
            onClick: () => this.props.onClick(i)
        });
    }

    render() {
        let col, row;
        let boardRows = new Array();
        for (col = 0; col < 5; col++) {
            let squares = new Array();
            for (row = 0; row < 5; row++) {
                squares.push(this.renderSquare(col * 5 + row));
            }
            boardRows.push(React.createElement(
                "div",
                { key: col, className: "board-row" },
                squares
            ));
        }

        return React.createElement(
            "div",
            { key: "squares" },
            boardRows
        );
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Board);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Square; });
function Square(props) {
    return React.createElement(
        "button",
        {
            key: props.index,
            className: "square",
            onClick: () => props.onClick(),
            style: props.highlight ? { backgroundColor: "yellow" } : {} },
        props.value
    );
}



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_toggle_button__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_toggle_button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_toggle_button__);


class GameInfo extends React.Component {
    render() {
        const current = this.props.history[this.props.stepNumber];
        const moves = this.props.history.map((step, move) => {
            const desc = move ? 'Go to Move ' + convartFormat(step.chengeSquare) : 'Go to Game start';
            return React.createElement(
                'li',
                { key: move },
                React.createElement(
                    'button',
                    {
                        style: this.props.stepNumber === move ? { fontWeight: 'bold' } : { fontWeight: 'normal' },
                        onClick: () => this.props.onClickList(move) },
                    desc
                )
            );
        });
        if (!this.props.sortAscending) {
            moves.reverse();
        }

        let status;
        if (this.props.winner) {
            status = 'Winner: ' + current.squares[this.props.winner[0]];
        } else if (this.props.stepNumber === 9) {
            status = 'This Game is Draw';
        } else {
            status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
        }

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                null,
                status
            ),
            React.createElement(__WEBPACK_IMPORTED_MODULE_0_react_toggle_button___default.a, {
                inactiveLabel: '9\u21921',
                activeLabel: '1\u21929',
                value: this.props.sortAscending,
                onToggle: () => this.props.onToggle(this.props.sortAscending)
            }),
            React.createElement(
                'ol',
                null,
                moves
            )
        );
    }
}

function convartFormat(chengeSquare) {
    let col = 1;
    let row = 1;
    if (chengeSquare) {
        col = Math.floor(chengeSquare / 5) + 1;
        row = chengeSquare % 5 + 1;
    }
    return '(' + col + ', ' + row + ')';
}

/* harmony default export */ __webpack_exports__["a"] = (GameInfo);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(11)):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports["react-toggle-button"]=t(require("react")):e["react-toggle-button"]=t(e.React)}(this,function(e){return function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={exports:{},id:r,loaded:!1};return e[r].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(12)},function(e,t,n){e.exports=n(17)()},function(e,t){"use strict";function n(e){var t={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]="number"==typeof e[n]?e[n]:e[n].val);return t}t.__esModule=!0,t.default=n,e.exports=t.default},function(t,n){t.exports=e},function(e,t,n){(function(t){(function(){var n,r,a;"undefined"!=typeof performance&&null!==performance&&performance.now?e.exports=function(){return performance.now()}:"undefined"!=typeof t&&null!==t&&t.hrtime?(e.exports=function(){return(n()-a)/1e6},r=t.hrtime,n=function(){var e;return e=r(),1e9*e[0]+e[1]},a=n()):Date.now?(e.exports=function(){return Date.now()-a},a=Date.now()):(e.exports=function(){return(new Date).getTime()-a},a=(new Date).getTime())}).call(this)}).call(t,n(9))},function(e,t,n){(function(t){for(var r=n(19),a="undefined"==typeof window?t:window,o=["moz","webkit"],i="AnimationFrame",l=a["request"+i],u=a["cancel"+i]||a["cancelRequest"+i],s=0;!l&&s<o.length;s++)l=a[o[s]+"Request"+i],u=a[o[s]+"Cancel"+i]||a[o[s]+"CancelRequest"+i];if(!l||!u){var c=0,f=0,p=[],d=1e3/60;l=function(e){if(0===p.length){var t=r(),n=Math.max(0,d-(t-c));c=n+t,setTimeout(function(){var e=p.slice(0);p.length=0;for(var t=0;t<e.length;t++)if(!e[t].cancelled)try{e[t].callback(c)}catch(e){setTimeout(function(){throw e},0)}},Math.round(n))}return p.push({handle:++f,callback:e,cancelled:!1}),f},u=function(e){for(var t=0;t<p.length;t++)p[t].handle===e&&(p[t].cancelled=!0)}}e.exports=function(e){return l.call(a,e)},e.exports.cancel=function(){u.apply(a,arguments)},e.exports.polyfill=function(e){e||(e=a),e.requestAnimationFrame=l,e.cancelAnimationFrame=u}}).call(t,function(){return this}())},function(e,t){"use strict";function n(e){var t={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=0);return t}t.__esModule=!0,t.default=n,e.exports=t.default},function(e,t){"use strict";function n(e,t,n){for(var r in t)if(Object.prototype.hasOwnProperty.call(t,r)){if(0!==n[r])return!1;var a="number"==typeof t[r]?t[r]:t[r].val;if(e[r]!==a)return!1}return!0}t.__esModule=!0,t.default=n,e.exports=t.default},function(e,t){"use strict";function n(e,t,n,a,o,i,l){var u=-o*(t-a),s=-i*n,c=u+s,f=n+c*e,p=t+f*e;return Math.abs(f)<l&&Math.abs(p-a)<l?(r[0]=a,r[1]=0,r):(r[0]=p,r[1]=f,r)}t.__esModule=!0,t.default=n;var r=[0,0];e.exports=t.default},function(e,t){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function a(e){if(c===setTimeout)return setTimeout(e,0);if((c===n||!c)&&setTimeout)return c=setTimeout,setTimeout(e,0);try{return c(e,0)}catch(t){try{return c.call(null,e,0)}catch(t){return c.call(this,e,0)}}}function o(e){if(f===clearTimeout)return clearTimeout(e);if((f===r||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(e);try{return f(e)}catch(t){try{return f.call(null,e)}catch(t){return f.call(this,e)}}}function i(){h&&d&&(h=!1,d.length?y=d.concat(y):m=-1,y.length&&l())}function l(){if(!h){var e=a(i);h=!0;for(var t=y.length;t;){for(d=y,y=[];++m<t;)d&&d[m].run();m=-1,t=y.length}d=null,h=!1,o(e)}}function u(e,t){this.fun=e,this.array=t}function s(){}var c,f,p=e.exports={};!function(){try{c="function"==typeof setTimeout?setTimeout:n}catch(e){c=n}try{f="function"==typeof clearTimeout?clearTimeout:r}catch(e){f=r}}();var d,y=[],h=!1,m=-1;p.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];y.push(new u(e,t)),1!==y.length||h||a(l)},u.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=s,p.addListener=s,p.once=s,p.off=s,p.removeListener=s,p.removeAllListeners=s,p.emit=s,p.prependListener=s,p.prependOnceListener=s,p.listeners=function(e){return[]},p.binding=function(e){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(e){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}},function(e,t){"use strict";t.__esModule=!0,t.default={noWobble:{stiffness:170,damping:26},gentle:{stiffness:120,damping:14},wobbly:{stiffness:180,damping:12},stiff:{stiffness:210,damping:20}},e.exports=t.default},function(e,t){"use strict";function n(e){var t=e;if(l[t])return l[t];t=t.replace("#",""),3===t.length&&(t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]);var n=t.match(/.{2}/g),r={r:parseInt(n[0],16),g:parseInt(n[1],16),b:parseInt(n[2],16)};return l[t]=r,r}function r(e){var t=e.indexOf("rgb")!=-1,n=e.indexOf("rgba")!=-1,r=e.match(/\d+/g);if(t&&!n)return{r:parseInt(r[0]),g:parseInt(r[1]),b:parseInt(r[2])};if(t&&n){var a="0"==r[3]?"0."+r[4]:r[3];return{r:parseInt(r[0]),g:parseInt(r[1]),b:parseInt(r[2]),a:parseFloat(a)}}return null}function a(e,t,n){var r=e.toString(16),a=t.toString(16),o=n.toString(16);return r=r.length<2?"0"+r:r,a=a.length<2?"0"+a:a,o=o.length<2?"0"+o:o,"#"+r+a+o}function o(e,t,n,r,a){var o=n-t,i=a-r,l=(e-t)/o;return r+l*i}function i(e,t,n,a,i,l){var u=void 0===a?0:a,s=void 0===i?1:i,c=r(t),f=r(n),p=Math.floor(o(e,u,s,c.r,f.r)),d=Math.floor(o(e,u,s,c.g,f.g)),y=Math.floor(o(e,u,s,c.b,f.b)),h=!1,m=null;return c.a&&f.a&&(h=!0,m=o(e,u,s,c.a,f.a)),m?"rgb("+p+","+d+","+y+","+m+")":"rgb("+p+","+d+","+y+")"}Object.defineProperty(t,"__esModule",{value:!0}),t.hexToRGB=n,t.rgbToObj=r,t.rgbToHex=a,t.mapValueInRange=o,t.interpolateColor=i;var l={}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var a=n(13),o=r(a);e.exports=o.default},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(3),c=r(s),f=n(24),p=n(1),d=r(p),y=n(14),h=n(11),m={active:{base:"rgb(1,124,66)",hover:"rgb(1,124,66)"},inactive:{base:"rgb(65,66,68)",hover:"rgb(65,66,68)"},activeThumb:{base:"rgb(250,250,250)",hover:"rgb(250,250,250)"},inactiveThumb:{base:"rgb(250,250,250)",hover:"rgb(250,250,250)"}},v={},b=function(e){function t(e){a(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={isHover:!1},n}return i(t,e),u(t,[{key:"onMouseOver",value:function(){this.setState({isHover:!0})}},{key:"onMouseOut",value:function(){this.setState({isHover:!1})}},{key:"_convertToRgb",value:function(e,t){if(e.indexOf("#")!=-1){var n=(0,h.hexToRGB)(e);return"rgb("+n.r+", "+n.g+", "+n.b+")"}return e.indexOf("rgb")==-1?t:e}},{key:"checkAllColors",value:function(e){var t=this;return Object.keys(e).forEach(function(n){t.checkColors(e,n)}),e}},{key:"checkColors",value:function(e,t){e[t]?e[t].hover?(e[t].base=this._convertToRgb(e[t].base,m[t].base),e[t].hover=this._convertToRgb(e[t].hover,m[t].hover)):e[t].base?(e[t].base=this._convertToRgb(e[t].base,m[t].base),e[t].hover=e[t].base):(console.warn('Color prop should have a "base" style and a "hover" style!'),e[t]=m[t]):e[t]=m[t]}},{key:"interpolateColorWithHover",value:function(e,t,n){var r=this.props.colors;return this.checkColors(r,t),this.checkColors(r,n),this.state.isHover?{backgroundColor:(0,h.interpolateColor)(e,r[t].hover,r[n].hover,0,400)}:{backgroundColor:(0,h.interpolateColor)(e,r[t].base,r[n].base,0,400)}}},{key:"makeStyle",value:function(e,t){return this.state.isHover?l({},e,t):e}},{key:"handleClick",value:function(e){e.target!==this._input&&(e.preventDefault(),this._input.focus(),this._input.click())}},{key:"render",value:function(){var e=this,t=this.props,n=t.internalSpringSetting,r=t.internalHoverSpringSetting,a=t.value,o=t.thumbAnimateRange,i=(t.isHover,t.containerStyle),u=t.trackStyle,s=t.animateTrackStyleToggle,p=t.animateTrackStyleHover,d=t.thumbStyleHover,h=t.trackStyleHover,m=t.activeLabelStyle,v=t.activeLabelStyleHover,b=t.activeLabel,g=t.inactiveLabelStyle,S=t.inactiveLabelStyleHover,T=t.inactiveLabel,O=t.thumbStyle,k=t.animateThumbStyleHover,w=t.animateThumbStyleToggle,I=t.thumbIcon,P=t.onClick,j=t.onToggle,_=t.passThroughInputProps,x=n,M=r;return c.default.createElement(f.Motion,{style:{opacity:(0,f.spring)(a?1:0,x),left:(0,f.spring)(a?10*o[1]:10*o[0],x),colorNumber:(0,f.spring)(a?0:400,x),toggleNumber:(0,f.spring)(a?400:0,x),hoverNumber:(0,f.spring)(this.state.isHover?400:0,M)}},function(t){var n=t.opacity,r=t.left,o=t.colorNumber,f=t.hoverNumber,x=t.toggleNumber;return c.default.createElement("div",{style:l({},e.makeStyle(l({},y.reactToggle,i))),onMouseOver:e.onMouseOver.bind(e),onMouseOut:e.onMouseOut.bind(e),onClick:e.handleClick.bind(e)},c.default.createElement("div",{style:l({},e.makeStyle(l({},y.reactToggleTrack,u,e.interpolateColorWithHover(o,"active","inactive"),s(x/400)),l({},h,p(f/400))))},c.default.createElement("div",{style:l({},e.makeStyle(l({},y.reactToggleOn,m),v),{opacity:n})},b),c.default.createElement("div",{style:l({},e.makeStyle(l({},y.reactToggleOff,g),S),{opacity:1-n})},T)),c.default.createElement("div",{style:y.reactThumbCenteringContainer},c.default.createElement("div",{style:l({},e.makeStyle(l({},y.reactToggleThumb,O,e.interpolateColorWithHover(o,"activeThumb","inactiveThumb"),w(x/400)),l({},d,k(f/400))),{position:"relative",left:Math.round(r/10)})},I)),c.default.createElement("input",l({ref:function(t){e._input=t},type:"checkbox",style:y.reactToggleScreenReaderOnly,onClick:function(e){P&&P(e),j(a)},value:a},_)))})}}]),t}(s.Component);b.defaultProps={value:!1,onToggle:function(){},colors:m,passThroughInputProps:{},activeLabel:"ON",containerStyle:v,activeLabelStyle:v,activeLabelStyleHover:v,inactiveLabel:"OFF",inactiveLabelStyle:v,inactiveLabelStyleHover:v,thumbStyle:v,thumbStyleHover:v,animateThumbStyleHover:function(){return{}},animateThumbStyleToggle:function(){return{}},trackStyle:v,trackStyleHover:v,animateTrackStyleHover:function(){return{}},animateTrackStyleToggle:function(){return{}},thumbAnimateRange:[1,33],internalSpringSetting:{stiffness:180,damping:22},internalHoverSpringSetting:{stiffness:180,damping:20}},b.displayName="Toggle",t.default=b,b.propTypes={value:d.default.bool.isRequired,onToggle:d.default.func.isRequired,passThroughInputProps:d.default.object,onClick:d.default.func,colors:d.default.object,activeLabel:d.default.oneOfType([d.default.string,d.default.object]),containerStyle:d.default.object,activeLabelStyle:d.default.object,activeLabelStyleHover:d.default.object,activeThumbStyle:d.default.object,activeThumbStyleHover:d.default.object,inactiveLabel:d.default.oneOfType([d.default.string,d.default.object]),inactiveLabelStyle:d.default.object,inactiveLabelStyleHover:d.default.object,thumbStyle:d.default.object,thumbStyleHover:d.default.object,trackStyle:d.default.object,trackStyleHover:d.default.object,animateThumbStyleHover:d.default.func,animateTrackStyleHover:d.default.func,animateTrackStyleToggle:d.default.func,animateThumbStyleToggle:d.default.func,internalSpringSetting:d.default.object,internalHoverSpringSetting:d.default.object,thumbIcon:d.default.oneOfType([d.default.string,d.default.object]),thumbAnimateRange:d.default.array}},function(e,t){"use strict";function n(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=(t.reactToggle=n({display:"flex",width:52,alignItems:"center",justifyContent:"flex-start",position:"relative",cursor:"pointer",backgroundColor:"transparent",border:0,padding:0,WebkitTouchCallout:"none",WebkitUserSelect:"none",KhtmlUserSelect:"none",MozUserSelect:"none",msUserSelect:"none",userSelect:"none",WebkitTapHighlightColor:"rgba(0,0,0,0)"},"WebkitTapHighlightColor","transparent"),{fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Helvetica Neue', Helvetica, sans-serif"});t.reactToggleScreenReaderOnly={border:0,clip:"rect(0 0 0 0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",width:1},t.reactToggleTrack={width:"52px",height:"20px",padding:0,borderRadius:"26px",display:"flex",alignItems:"center",justifyContent:"center"},t.reactToggleOn=r({},a,{position:"relative",color:"#FAFAFA",marginTop:"auto",marginBottom:"auto",lineHeight:0,opacity:0,width:26,height:20,left:4}),t.reactToggleOff=r({},a,{position:"relative",color:"rgba(255,255,255,0.6)",bottom:"0px",marginTop:"auto",marginBottom:"auto",paddingRight:5,lineHeight:0,width:26,height:20}),t.reactToggleThumb={width:"18px",height:"18px",display:"flex",alignSelf:"center",boxShadow:"0 0 0 1px rgba(0,0,0,0.3)",borderRadius:"50%",WebkitBoxSizing:"border-box",MozBoxSizing:"border-box",boxSizing:"border-box"},t.reactThumbCenteringContainer={position:"absolute",height:"100%",top:0,left:0,display:"flex",flex:1,alignSelf:"stretch",alignItems:"center",justifyContent:"flex-start"}},function(e,t){"use strict";function n(e){return function(){return e}}var r=function(){};r.thatReturns=n,r.thatReturnsFalse=n(!1),r.thatReturnsTrue=n(!0),r.thatReturnsNull=n(null),r.thatReturnsThis=function(){return this},r.thatReturnsArgument=function(e){return e},e.exports=r},function(e,t,n){"use strict";function r(e,t,n,r,o,i,l,u){if(a(t),!e){var s;if(void 0===t)s=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[n,r,o,i,l,u],f=0;s=new Error(t.replace(/%s/g,function(){return c[f++]})),s.name="Invariant Violation"}throw s.framesToPop=1,s}}var a=function(e){};e.exports=r},function(e,t,n){"use strict";var r=n(15),a=n(16),o=n(18);e.exports=function(){function e(e,t,n,r,i,l){l!==o&&a(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return n.checkPropTypes=r,n.PropTypes=n,n}},function(e,t){"use strict";var n="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";e.exports=n},function(e,t,n){(function(t){(function(){var n,r,a,o,i,l;"undefined"!=typeof performance&&null!==performance&&performance.now?e.exports=function(){return performance.now()}:"undefined"!=typeof t&&null!==t&&t.hrtime?(e.exports=function(){return(n()-i)/1e6},r=t.hrtime,n=function(){var e;return e=r(),1e9*e[0]+e[1]},o=n(),l=1e9*t.uptime(),i=o-l):Date.now?(e.exports=function(){return Date.now()-a},a=Date.now()):(e.exports=function(){return(new Date).getTime()-a},a=(new Date).getTime())}).call(this)}).call(t,n(9))},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(6),s=r(u),c=n(2),f=r(c),p=n(8),d=r(p),y=n(4),h=r(y),m=n(5),v=r(m),b=n(7),g=r(b),S=n(3),T=r(S),O=n(1),k=r(O),w=1e3/60,I=function(e){function t(n){var r=this;a(this,t),e.call(this,n),this.wasAnimating=!1,this.animationID=null,this.prevTime=0,this.accumulatedTime=0,this.unreadPropStyle=null,this.clearUnreadPropStyle=function(e){var t=!1,n=r.state,a=n.currentStyle,o=n.currentVelocity,l=n.lastIdealStyle,u=n.lastIdealVelocity;for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)){var c=e[s];"number"==typeof c&&(t||(t=!0,a=i({},a),o=i({},o),l=i({},l),u=i({},u)),a[s]=c,o[s]=0,l[s]=c,u[s]=0)}t&&r.setState({currentStyle:a,currentVelocity:o,lastIdealStyle:l,lastIdealVelocity:u})},this.startAnimationIfNecessary=function(){r.animationID=v.default(function(e){var t=r.props.style;if(g.default(r.state.currentStyle,t,r.state.currentVelocity))return r.wasAnimating&&r.props.onRest&&r.props.onRest(),r.animationID=null,r.wasAnimating=!1,void(r.accumulatedTime=0);r.wasAnimating=!0;var n=e||h.default(),a=n-r.prevTime;if(r.prevTime=n,r.accumulatedTime=r.accumulatedTime+a,r.accumulatedTime>10*w&&(r.accumulatedTime=0),0===r.accumulatedTime)return r.animationID=null,void r.startAnimationIfNecessary();var o=(r.accumulatedTime-Math.floor(r.accumulatedTime/w)*w)/w,i=Math.floor(r.accumulatedTime/w),l={},u={},s={},c={};for(var f in t)if(Object.prototype.hasOwnProperty.call(t,f)){var p=t[f];if("number"==typeof p)s[f]=p,c[f]=0,l[f]=p,u[f]=0;else{for(var y=r.state.lastIdealStyle[f],m=r.state.lastIdealVelocity[f],v=0;v<i;v++){var b=d.default(w/1e3,y,m,p.val,p.stiffness,p.damping,p.precision);y=b[0],m=b[1]}var S=d.default(w/1e3,y,m,p.val,p.stiffness,p.damping,p.precision),T=S[0],O=S[1];s[f]=y+(T-y)*o,c[f]=m+(O-m)*o,l[f]=y,u[f]=m}}r.animationID=null,r.accumulatedTime-=i*w,r.setState({currentStyle:s,currentVelocity:c,lastIdealStyle:l,lastIdealVelocity:u}),r.unreadPropStyle=null,r.startAnimationIfNecessary()})},this.state=this.defaultState()}return o(t,e),l(t,null,[{key:"propTypes",value:{defaultStyle:k.default.objectOf(k.default.number),style:k.default.objectOf(k.default.oneOfType([k.default.number,k.default.object])).isRequired,children:k.default.func.isRequired,onRest:k.default.func},enumerable:!0}]),t.prototype.defaultState=function(){var e=this.props,t=e.defaultStyle,n=e.style,r=t||f.default(n),a=s.default(r);return{currentStyle:r,currentVelocity:a,lastIdealStyle:r,lastIdealVelocity:a}},t.prototype.componentDidMount=function(){this.prevTime=h.default(),this.startAnimationIfNecessary()},t.prototype.componentWillReceiveProps=function(e){null!=this.unreadPropStyle&&this.clearUnreadPropStyle(this.unreadPropStyle),this.unreadPropStyle=e.style,null==this.animationID&&(this.prevTime=h.default(),this.startAnimationIfNecessary())},t.prototype.componentWillUnmount=function(){null!=this.animationID&&(v.default.cancel(this.animationID),this.animationID=null)},t.prototype.render=function(){var e=this.props.children(this.state.currentStyle);return e&&T.default.Children.only(e)},t}(T.default.Component);t.default=I,e.exports=t.default},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e,t,n){for(var r=0;r<e.length;r++)if(!S.default(e[r],t[r],n[r]))return!1;return!0}t.__esModule=!0;var l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(6),c=r(s),f=n(2),p=r(f),d=n(8),y=r(d),h=n(4),m=r(h),v=n(5),b=r(v),g=n(7),S=r(g),T=n(3),O=r(T),k=n(1),w=r(k),I=1e3/60,P=function(e){function t(n){var r=this;a(this,t),e.call(this,n),this.animationID=null,this.prevTime=0,this.accumulatedTime=0,this.unreadPropStyles=null,this.clearUnreadPropStyle=function(e){for(var t=r.state,n=t.currentStyles,a=t.currentVelocities,o=t.lastIdealStyles,i=t.lastIdealVelocities,u=!1,s=0;s<e.length;s++){var c=e[s],f=!1;for(var p in c)if(Object.prototype.hasOwnProperty.call(c,p)){var d=c[p];"number"==typeof d&&(f||(f=!0,u=!0,n[s]=l({},n[s]),a[s]=l({},a[s]),o[s]=l({},o[s]),i[s]=l({},i[s])),n[s][p]=d,a[s][p]=0,o[s][p]=d,i[s][p]=0)}}u&&r.setState({currentStyles:n,currentVelocities:a,lastIdealStyles:o,lastIdealVelocities:i})},this.startAnimationIfNecessary=function(){r.animationID=b.default(function(e){var t=r.props.styles(r.state.lastIdealStyles);if(i(r.state.currentStyles,t,r.state.currentVelocities))return r.animationID=null,void(r.accumulatedTime=0);var n=e||m.default(),a=n-r.prevTime;if(r.prevTime=n,r.accumulatedTime=r.accumulatedTime+a,r.accumulatedTime>10*I&&(r.accumulatedTime=0),0===r.accumulatedTime)return r.animationID=null,void r.startAnimationIfNecessary();for(var o=(r.accumulatedTime-Math.floor(r.accumulatedTime/I)*I)/I,l=Math.floor(r.accumulatedTime/I),u=[],s=[],c=[],f=[],p=0;p<t.length;p++){var d=t[p],h={},v={},b={},g={};for(var S in d)if(Object.prototype.hasOwnProperty.call(d,S)){var T=d[S];if("number"==typeof T)h[S]=T,v[S]=0,b[S]=T,g[S]=0;else{for(var O=r.state.lastIdealStyles[p][S],k=r.state.lastIdealVelocities[p][S],w=0;w<l;w++){var P=y.default(I/1e3,O,k,T.val,T.stiffness,T.damping,T.precision);O=P[0],k=P[1]}var j=y.default(I/1e3,O,k,T.val,T.stiffness,T.damping,T.precision),_=j[0],x=j[1];h[S]=O+(_-O)*o,v[S]=k+(x-k)*o,b[S]=O,g[S]=k}}c[p]=h,f[p]=v,u[p]=b,s[p]=g}r.animationID=null,r.accumulatedTime-=l*I,r.setState({currentStyles:c,currentVelocities:f,lastIdealStyles:u,lastIdealVelocities:s}),r.unreadPropStyles=null,r.startAnimationIfNecessary()})},this.state=this.defaultState()}return o(t,e),u(t,null,[{key:"propTypes",value:{defaultStyles:w.default.arrayOf(w.default.objectOf(w.default.number)),styles:w.default.func.isRequired,children:w.default.func.isRequired},enumerable:!0}]),t.prototype.defaultState=function(){var e=this.props,t=e.defaultStyles,n=e.styles,r=t||n().map(p.default),a=r.map(function(e){return c.default(e)});return{currentStyles:r,currentVelocities:a,lastIdealStyles:r,lastIdealVelocities:a}},t.prototype.componentDidMount=function(){this.prevTime=m.default(),this.startAnimationIfNecessary()},t.prototype.componentWillReceiveProps=function(e){null!=this.unreadPropStyles&&this.clearUnreadPropStyle(this.unreadPropStyles),this.unreadPropStyles=e.styles(this.state.lastIdealStyles),null==this.animationID&&(this.prevTime=m.default(),this.startAnimationIfNecessary())},t.prototype.componentWillUnmount=function(){null!=this.animationID&&(b.default.cancel(this.animationID),this.animationID=null)},t.prototype.render=function(){var e=this.props.children(this.state.currentStyles);return e&&O.default.Children.only(e)},t}(O.default.Component);t.default=P,e.exports=t.default},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e,t,n){var r=t;return null==r?e.map(function(e,t){return{key:e.key,data:e.data,style:n[t]}}):e.map(function(e,t){for(var a=0;a<r.length;a++)if(r[a].key===e.key)return{key:r[a].key,data:r[a].data,style:n[t]};return{key:e.key,data:e.data,style:n[t]}})}function l(e,t,n,r){if(r.length!==t.length)return!1;for(var a=0;a<r.length;a++)if(r[a].key!==t[a].key)return!1;for(var a=0;a<r.length;a++)if(!w.default(e[a],t[a].style,n[a]))return!1;return!0}function u(e,t,n,r,a,o,i,l,u){for(var s=b.default(r,a,function(e,r){var a=t(r);return null==a?(n({key:r.key,data:r.data}),null):w.default(o[e],a,i[e])?(n({key:r.key,data:r.data}),null):{key:r.key,data:r.data,style:a}}),c=[],f=[],d=[],y=[],h=0;h<s.length;h++){for(var m=s[h],v=null,g=0;g<r.length;g++)if(r[g].key===m.key){v=g;break}if(null==v){var S=e(m);c[h]=S,d[h]=S;var T=p.default(m.style);f[h]=T,y[h]=T}else c[h]=o[v],d[h]=l[v],f[h]=i[v],y[h]=u[v]}return[s,c,f,d,y]}t.__esModule=!0;var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=n(6),p=r(f),d=n(2),y=r(d),h=n(8),m=r(h),v=n(23),b=r(v),g=n(4),S=r(g),T=n(5),O=r(T),k=n(7),w=r(k),I=n(3),P=r(I),j=n(1),_=r(j),x=1e3/60,M=function(e){function t(n){var r=this;a(this,t),e.call(this,n),this.unmounting=!1,this.animationID=null,this.prevTime=0,this.accumulatedTime=0,this.unreadPropStyles=null,this.clearUnreadPropStyle=function(e){for(var t=u(r.props.willEnter,r.props.willLeave,r.props.didLeave,r.state.mergedPropsStyles,e,r.state.currentStyles,r.state.currentVelocities,r.state.lastIdealStyles,r.state.lastIdealVelocities),n=t[0],a=t[1],o=t[2],i=t[3],l=t[4],c=0;c<e.length;c++){var f=e[c].style,p=!1;for(var d in f)if(Object.prototype.hasOwnProperty.call(f,d)){var y=f[d];"number"==typeof y&&(p||(p=!0,a[c]=s({},a[c]),o[c]=s({},o[c]),i[c]=s({},i[c]),l[c]=s({},l[c]),n[c]={key:n[c].key,data:n[c].data,style:s({},n[c].style)}),a[c][d]=y,o[c][d]=0,i[c][d]=y,l[c][d]=0,n[c].style[d]=y)}}r.setState({currentStyles:a,currentVelocities:o,mergedPropsStyles:n,lastIdealStyles:i,lastIdealVelocities:l})},this.startAnimationIfNecessary=function(){r.unmounting||(r.animationID=O.default(function(e){if(!r.unmounting){var t=r.props.styles,n="function"==typeof t?t(i(r.state.mergedPropsStyles,r.unreadPropStyles,r.state.lastIdealStyles)):t;if(l(r.state.currentStyles,n,r.state.currentVelocities,r.state.mergedPropsStyles))return r.animationID=null,void(r.accumulatedTime=0);var a=e||S.default(),o=a-r.prevTime;if(r.prevTime=a,r.accumulatedTime=r.accumulatedTime+o,r.accumulatedTime>10*x&&(r.accumulatedTime=0),0===r.accumulatedTime)return r.animationID=null,void r.startAnimationIfNecessary();for(var s=(r.accumulatedTime-Math.floor(r.accumulatedTime/x)*x)/x,c=Math.floor(r.accumulatedTime/x),f=u(r.props.willEnter,r.props.willLeave,r.props.didLeave,r.state.mergedPropsStyles,n,r.state.currentStyles,r.state.currentVelocities,r.state.lastIdealStyles,r.state.lastIdealVelocities),p=f[0],d=f[1],y=f[2],h=f[3],v=f[4],b=0;b<p.length;b++){var g=p[b].style,T={},O={},k={},w={};for(var I in g)if(Object.prototype.hasOwnProperty.call(g,I)){var P=g[I];if("number"==typeof P)T[I]=P,O[I]=0,k[I]=P,w[I]=0;else{for(var j=h[b][I],_=v[b][I],M=0;M<c;M++){var R=m.default(x/1e3,j,_,P.val,P.stiffness,P.damping,P.precision);j=R[0],_=R[1]}var C=m.default(x/1e3,j,_,P.val,P.stiffness,P.damping,P.precision),D=C[0],H=C[1];T[I]=j+(D-j)*s,O[I]=_+(H-_)*s,k[I]=j,w[I]=_}}h[b]=k,v[b]=w,d[b]=T,y[b]=O}r.animationID=null,r.accumulatedTime-=c*x,r.setState({currentStyles:d,currentVelocities:y,lastIdealStyles:h,lastIdealVelocities:v,mergedPropsStyles:p}),r.unreadPropStyles=null,r.startAnimationIfNecessary()}}))},this.state=this.defaultState()}return o(t,e),c(t,null,[{key:"propTypes",value:{defaultStyles:_.default.arrayOf(_.default.shape({key:_.default.string.isRequired,data:_.default.any,style:_.default.objectOf(_.default.number).isRequired})),styles:_.default.oneOfType([_.default.func,_.default.arrayOf(_.default.shape({key:_.default.string.isRequired,data:_.default.any,style:_.default.objectOf(_.default.oneOfType([_.default.number,_.default.object])).isRequired}))]).isRequired,children:_.default.func.isRequired,willEnter:_.default.func,willLeave:_.default.func,didLeave:_.default.func},enumerable:!0},{key:"defaultProps",value:{willEnter:function(e){return y.default(e.style)},willLeave:function(){return null},didLeave:function(){}},enumerable:!0}]),t.prototype.defaultState=function(){var e=this.props,t=e.defaultStyles,n=e.styles,r=e.willEnter,a=e.willLeave,o=e.didLeave,i="function"==typeof n?n(t):n,l=void 0;l=null==t?i:t.map(function(e){for(var t=0;t<i.length;t++)if(i[t].key===e.key)return i[t];return e});var s=null==t?i.map(function(e){return y.default(e.style)}):t.map(function(e){return y.default(e.style)}),c=null==t?i.map(function(e){return p.default(e.style)}):t.map(function(e){return p.default(e.style)}),f=u(r,a,o,l,i,s,c,s,c),d=f[0],h=f[1],m=f[2],v=f[3],b=f[4];return{currentStyles:h,currentVelocities:m,lastIdealStyles:v,lastIdealVelocities:b,mergedPropsStyles:d}},t.prototype.componentDidMount=function(){this.prevTime=S.default(),this.startAnimationIfNecessary()},t.prototype.componentWillReceiveProps=function(e){this.unreadPropStyles&&this.clearUnreadPropStyle(this.unreadPropStyles);var t=e.styles;"function"==typeof t?this.unreadPropStyles=t(i(this.state.mergedPropsStyles,this.unreadPropStyles,this.state.lastIdealStyles)):this.unreadPropStyles=t,null==this.animationID&&(this.prevTime=S.default(),this.startAnimationIfNecessary())},t.prototype.componentWillUnmount=function(){this.unmounting=!0,null!=this.animationID&&(O.default.cancel(this.animationID),this.animationID=null)},t.prototype.render=function(){var e=i(this.state.mergedPropsStyles,this.unreadPropStyles,this.state.currentStyles),t=this.props.children(e);return t&&P.default.Children.only(t)},t}(P.default.Component);t.default=M,e.exports=t.default},function(e,t){"use strict";function n(e,t,n){for(var r={},a=0;a<e.length;a++)r[e[a].key]=a;for(var o={},a=0;a<t.length;a++)o[t[a].key]=a;for(var i=[],a=0;a<t.length;a++)i[a]=t[a];for(var a=0;a<e.length;a++)if(!Object.prototype.hasOwnProperty.call(o,e[a].key)){var l=n(a,e[a]);null!=l&&i.push(l)}return i.sort(function(e,n){var a=o[e.key],i=o[n.key],l=r[e.key],u=r[n.key];if(null!=a&&null!=i)return o[e.key]-o[n.key];if(null!=l&&null!=u)return r[e.key]-r[n.key];if(null!=a){for(var s=0;s<t.length;s++){var c=t[s].key;if(Object.prototype.hasOwnProperty.call(r,c)){if(a<o[c]&&u>r[c])return-1;if(a>o[c]&&u<r[c])return 1}}return 1}for(var s=0;s<t.length;s++){var c=t[s].key;if(Object.prototype.hasOwnProperty.call(r,c)){if(i<o[c]&&l>r[c])return 1;if(i>o[c]&&l<r[c])return-1}}return-1})}t.__esModule=!0,t.default=n,e.exports=t.default},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e.default:e}t.__esModule=!0;var a=n(20);t.Motion=r(a);var o=n(21);t.StaggeredMotion=r(o);var i=n(22);t.TransitionMotion=r(i);var l=n(26);t.spring=r(l);var u=n(10);t.presets=r(u);var s=n(2);t.stripStyle=r(s);var c=n(25);
t.reorderKeys=r(c)},function(e,t,n){"use strict";function r(){}t.__esModule=!0,t.default=r,e.exports=t.default},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){return o({},u,t,{val:e})}t.__esModule=!0;var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t.default=a;var i=n(10),l=r(i),u=o({},l.default.noWobble,{precision:.01});e.exports=t.default}])});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (process.env.NODE_ENV === 'production') {
  module.exports = __webpack_require__(12);
} else {
  module.exports = __webpack_require__(13);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.2.0
 * react.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var m=__webpack_require__(2),n=__webpack_require__(3),p=__webpack_require__(1),q="function"===typeof Symbol&&Symbol["for"],r=q?Symbol["for"]("react.element"):60103,t=q?Symbol["for"]("react.call"):60104,u=q?Symbol["for"]("react.return"):60105,v=q?Symbol["for"]("react.portal"):60106,w=q?Symbol["for"]("react.fragment"):60107,x="function"===typeof Symbol&&Symbol.iterator;
function y(a){for(var b=arguments.length-1,e="Minified React error #"+a+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d"+a,c=0;c<b;c++)e+="\x26args[]\x3d"+encodeURIComponent(arguments[c+1]);b=Error(e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");b.name="Invariant Violation";b.framesToPop=1;throw b;}
var z={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}};function A(a,b,e){this.props=a;this.context=b;this.refs=n;this.updater=e||z}A.prototype.isReactComponent={};A.prototype.setState=function(a,b){"object"!==typeof a&&"function"!==typeof a&&null!=a?y("85"):void 0;this.updater.enqueueSetState(this,a,b,"setState")};A.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};
function B(a,b,e){this.props=a;this.context=b;this.refs=n;this.updater=e||z}function C(){}C.prototype=A.prototype;var D=B.prototype=new C;D.constructor=B;m(D,A.prototype);D.isPureReactComponent=!0;function E(a,b,e){this.props=a;this.context=b;this.refs=n;this.updater=e||z}var F=E.prototype=new C;F.constructor=E;m(F,A.prototype);F.unstable_isAsyncReactComponent=!0;F.render=function(){return this.props.children};var G={current:null},H=Object.prototype.hasOwnProperty,I={key:!0,ref:!0,__self:!0,__source:!0};
function J(a,b,e){var c,d={},g=null,k=null;if(null!=b)for(c in void 0!==b.ref&&(k=b.ref),void 0!==b.key&&(g=""+b.key),b)H.call(b,c)&&!I.hasOwnProperty(c)&&(d[c]=b[c]);var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){for(var h=Array(f),l=0;l<f;l++)h[l]=arguments[l+2];d.children=h}if(a&&a.defaultProps)for(c in f=a.defaultProps,f)void 0===d[c]&&(d[c]=f[c]);return{$$typeof:r,type:a,key:g,ref:k,props:d,_owner:G.current}}function K(a){return"object"===typeof a&&null!==a&&a.$$typeof===r}
function escape(a){var b={"\x3d":"\x3d0",":":"\x3d2"};return"$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var L=/\/+/g,M=[];function N(a,b,e,c){if(M.length){var d=M.pop();d.result=a;d.keyPrefix=b;d.func=e;d.context=c;d.count=0;return d}return{result:a,keyPrefix:b,func:e,context:c,count:0}}function O(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>M.length&&M.push(a)}
function P(a,b,e,c){var d=typeof a;if("undefined"===d||"boolean"===d)a=null;var g=!1;if(null===a)g=!0;else switch(d){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case r:case t:case u:case v:g=!0}}if(g)return e(c,a,""===b?"."+Q(a,0):b),1;g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var k=0;k<a.length;k++){d=a[k];var f=b+Q(d,k);g+=P(d,f,e,c)}else if(null===a||"undefined"===typeof a?f=null:(f=x&&a[x]||a["@@iterator"],f="function"===typeof f?f:null),"function"===typeof f)for(a=
f.call(a),k=0;!(d=a.next()).done;)d=d.value,f=b+Q(d,k++),g+=P(d,f,e,c);else"object"===d&&(e=""+a,y("31","[object Object]"===e?"object with keys {"+Object.keys(a).join(", ")+"}":e,""));return g}function Q(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function R(a,b){a.func.call(a.context,b,a.count++)}
function S(a,b,e){var c=a.result,d=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?T(a,c,e,p.thatReturnsArgument):null!=a&&(K(a)&&(b=d+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(L,"$\x26/")+"/")+e,a={$$typeof:r,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}),c.push(a))}function T(a,b,e,c,d){var g="";null!=e&&(g=(""+e).replace(L,"$\x26/")+"/");b=N(b,g,c,d);null==a||P(a,"",S,b);O(b)}
var U={Children:{map:function(a,b,e){if(null==a)return a;var c=[];T(a,c,null,b,e);return c},forEach:function(a,b,e){if(null==a)return a;b=N(null,null,b,e);null==a||P(a,"",R,b);O(b)},count:function(a){return null==a?0:P(a,"",p.thatReturnsNull,null)},toArray:function(a){var b=[];T(a,b,null,p.thatReturnsArgument);return b},only:function(a){K(a)?void 0:y("143");return a}},Component:A,PureComponent:B,unstable_AsyncComponent:E,Fragment:w,createElement:J,cloneElement:function(a,b,e){var c=m({},a.props),
d=a.key,g=a.ref,k=a._owner;if(null!=b){void 0!==b.ref&&(g=b.ref,k=G.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var f=a.type.defaultProps;for(h in b)H.call(b,h)&&!I.hasOwnProperty(h)&&(c[h]=void 0===b[h]&&void 0!==f?f[h]:b[h])}var h=arguments.length-2;if(1===h)c.children=e;else if(1<h){f=Array(h);for(var l=0;l<h;l++)f[l]=arguments[l+2];c.children=f}return{$$typeof:r,type:a.type,key:d,ref:g,props:c,_owner:k}},createFactory:function(a){var b=J.bind(null,a);b.type=a;return b},
isValidElement:K,version:"16.2.0",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:G,assign:m}},V=Object.freeze({default:U}),W=V&&U||V;module.exports=W["default"]?W["default"]:W;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.2.0
 * react.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (process.env.NODE_ENV !== "production") {
  (function() {
'use strict';

var _assign = __webpack_require__(2);
var emptyObject = __webpack_require__(3);
var invariant = __webpack_require__(4);
var warning = __webpack_require__(5);
var emptyFunction = __webpack_require__(1);
var checkPropTypes = __webpack_require__(14);

// TODO: this is special because it gets imported during build.

var ReactVersion = '16.2.0';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol['for'];

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol['for']('react.element') : 0xeac7;
var REACT_CALL_TYPE = hasSymbol ? Symbol['for']('react.call') : 0xeac8;
var REACT_RETURN_TYPE = hasSymbol ? Symbol['for']('react.return') : 0xeac9;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol['for']('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol['for']('react.fragment') : 0xeacb;

var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';

function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable === 'undefined') {
    return null;
  }
  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }
  return null;
}

/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning$1 = lowPriorityWarning;

var didWarnStateUpdateForUnmountedComponent = {};

function warnNoop(publicInstance, callerName) {
  {
    var constructor = publicInstance.constructor;
    var componentName = constructor && (constructor.displayName || constructor.name) || 'ReactClass';
    var warningKey = componentName + '.' + callerName;
    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return;
    }
    warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, componentName);
    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
    warnNoop(publicInstance, 'setState');
  }
};

/**
 * Base class helpers for the updating state of a component.
 */
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
Component.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
{
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    Object.defineProperty(Component.prototype, methodName, {
      get: function () {
        lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
        return undefined;
      }
    });
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

/**
 * Base class helpers for the updating state of a component.
 */
function PureComponent(props, context, updater) {
  // Duplicated from Component.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;
var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = PureComponent;
// Avoid an extra prototype jump for these methods.
_assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;

function AsyncComponent(props, context, updater) {
  // Duplicated from Component.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

var asyncComponentPrototype = AsyncComponent.prototype = new ComponentDummy();
asyncComponentPrototype.constructor = AsyncComponent;
// Avoid an extra prototype jump for these methods.
_assign(asyncComponentPrototype, Component.prototype);
asyncComponentPrototype.unstable_isAsyncReactComponent = true;
asyncComponentPrototype.render = function () {
  return this.props.children;
};

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

var hasOwnProperty = Object.prototype.hasOwnProperty;

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown;
var specialPropRefWarningShown;

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    });
    // self and source are DEV only properties.
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    });
    // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */
function createElement(type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  {
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}

/**
 * Return a function that produces ReactElements of a given type.
 * See https://reactjs.org/docs/react-api.html#createfactory
 */


function cloneAndReplaceKey(oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
}

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://reactjs.org/docs/react-api.html#cloneelement
 */
function cloneElement(element, config, children) {
  var propName;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
}

/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
function isValidElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}

var ReactDebugCurrentFrame = {};

{
  // Component that is being worked on
  ReactDebugCurrentFrame.getCurrentStack = null;

  ReactDebugCurrentFrame.getStackAddendum = function () {
    var impl = ReactDebugCurrentFrame.getCurrentStack;
    if (impl) {
      return impl();
    }
    return null;
  };
}

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */
function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

var POOL_SIZE = 10;
var traverseContextPool = [];
function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
  if (traverseContextPool.length) {
    var traverseContext = traverseContextPool.pop();
    traverseContext.result = mapResult;
    traverseContext.keyPrefix = keyPrefix;
    traverseContext.func = mapFunction;
    traverseContext.context = mapContext;
    traverseContext.count = 0;
    return traverseContext;
  } else {
    return {
      result: mapResult,
      keyPrefix: keyPrefix,
      func: mapFunction,
      context: mapContext,
      count: 0
    };
  }
}

function releaseTraverseContext(traverseContext) {
  traverseContext.result = null;
  traverseContext.keyPrefix = null;
  traverseContext.func = null;
  traverseContext.context = null;
  traverseContext.count = 0;
  if (traverseContextPool.length < POOL_SIZE) {
    traverseContextPool.push(traverseContext);
  }
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  var invokeCallback = false;

  if (children === null) {
    invokeCallback = true;
  } else {
    switch (type) {
      case 'string':
      case 'number':
        invokeCallback = true;
        break;
      case 'object':
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_CALL_TYPE:
          case REACT_RETURN_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
        }
    }
  }

  if (invokeCallback) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (typeof iteratorFn === 'function') {
      {
        // Warn about using Maps as children
        if (iteratorFn === children.entries) {
          warning(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', ReactDebugCurrentFrame.getStackAddendum());
          didWarnAboutMaps = true;
        }
      }

      var iterator = iteratorFn.call(children);
      var step;
      var ii = 0;
      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getComponentKey(child, ii++);
        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
      }
    } else if (type === 'object') {
      var addendum = '';
      {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
      }
      var childrenString = '' + children;
      invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (typeof component === 'object' && component !== null && component.key != null) {
    // Explicit key
    return escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  releaseTraverseContext(traverseContext);
}

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (isValidElement(mappedChild)) {
      mappedChild = cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  releaseTraverseContext(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
  return children;
}

var describeComponentFrame = function (name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
};

function getComponentName(fiber) {
  var type = fiber.type;

  if (typeof type === 'string') {
    return type;
  }
  if (typeof type === 'function') {
    return type.displayName || type.name;
  }
  return null;
}

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */

{
  var currentlyValidatingElement = null;

  var propTypesMisspellWarningShown = false;

  var getDisplayName = function (element) {
    if (element == null) {
      return '#empty';
    } else if (typeof element === 'string' || typeof element === 'number') {
      return '#text';
    } else if (typeof element.type === 'string') {
      return element.type;
    } else if (element.type === REACT_FRAGMENT_TYPE) {
      return 'React.Fragment';
    } else {
      return element.type.displayName || element.type.name || 'Unknown';
    }
  };

  var getStackAddendum = function () {
    var stack = '';
    if (currentlyValidatingElement) {
      var name = getDisplayName(currentlyValidatingElement);
      var owner = currentlyValidatingElement._owner;
      stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
    }
    stack += ReactDebugCurrentFrame.getStackAddendum() || '';
    return stack;
  };

  var VALID_FRAGMENT_PROPS = new Map([['children', true], ['key', true]]);
}

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = getComponentName(ReactCurrentOwner.current);
    if (name) {
      return '\n\nCheck the render method of `' + name + '`.';
    }
  }
  return '';
}

function getSourceInfoErrorAddendum(elementProps) {
  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = '\n\nCheck the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
    return;
  }
  ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
  }

  currentlyValidatingElement = element;
  {
    warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum());
  }
  currentlyValidatingElement = null;
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    if (typeof iteratorFn === 'function') {
      // Entry iterators used to provide implicit keys,
      // but now we print a separate warning for them later.
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  var propTypes = componentClass.propTypes;
  if (propTypes) {
    currentlyValidatingElement = element;
    checkPropTypes(propTypes, element.props, 'prop', name, getStackAddendum);
    currentlyValidatingElement = null;
  } else if (componentClass.PropTypes !== undefined && !propTypesMisspellWarningShown) {
    propTypesMisspellWarningShown = true;
    warning(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
  }
}

/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */
function validateFragmentProps(fragment) {
  currentlyValidatingElement = fragment;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(fragment.props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      if (!VALID_FRAGMENT_PROPS.has(key)) {
        warning(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.%s', key, getStackAddendum());
        break;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (fragment.ref !== null) {
    warning(false, 'Invalid attribute `ref` supplied to `React.Fragment`.%s', getStackAddendum());
  }

  currentlyValidatingElement = null;
}

function createElementWithValidation(type, props, children) {
  var validType = typeof type === 'string' || typeof type === 'function' || typeof type === 'symbol' || typeof type === 'number';
  // We warn in this case but don't throw. We expect the element creation to
  // succeed and there will likely be errors in render.
  if (!validType) {
    var info = '';
    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
    }

    var sourceInfo = getSourceInfoErrorAddendum(props);
    if (sourceInfo) {
      info += sourceInfo;
    } else {
      info += getDeclarationErrorAddendum();
    }

    info += getStackAddendum() || '';

    warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info);
  }

  var element = createElement.apply(this, arguments);

  // The result can be nullish if a mock or a custom function is used.
  // TODO: Drop this when these are no longer allowed as the type argument.
  if (element == null) {
    return element;
  }

  // Skip key warning if the type isn't valid since our key validation logic
  // doesn't expect a non-string/function type and can throw confusing errors.
  // We don't want exception behavior to differ between dev and prod.
  // (Rendering will throw with a helpful message and as soon as the type is
  // fixed, the key warnings will appear.)
  if (validType) {
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], type);
    }
  }

  if (typeof type === 'symbol' && type === REACT_FRAGMENT_TYPE) {
    validateFragmentProps(element);
  } else {
    validatePropTypes(element);
  }

  return element;
}

function createFactoryWithValidation(type) {
  var validatedFactory = createElementWithValidation.bind(null, type);
  // Legacy hook TODO: Warn if this is accessed
  validatedFactory.type = type;

  {
    Object.defineProperty(validatedFactory, 'type', {
      enumerable: false,
      get: function () {
        lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
        Object.defineProperty(this, 'type', {
          value: type
        });
        return type;
      }
    });
  }

  return validatedFactory;
}

function cloneElementWithValidation(element, props, children) {
  var newElement = cloneElement.apply(this, arguments);
  for (var i = 2; i < arguments.length; i++) {
    validateChildKeys(arguments[i], newElement.type);
  }
  validatePropTypes(newElement);
  return newElement;
}

var React = {
  Children: {
    map: mapChildren,
    forEach: forEachChildren,
    count: countChildren,
    toArray: toArray,
    only: onlyChild
  },

  Component: Component,
  PureComponent: PureComponent,
  unstable_AsyncComponent: AsyncComponent,

  Fragment: REACT_FRAGMENT_TYPE,

  createElement: createElementWithValidation,
  cloneElement: cloneElementWithValidation,
  createFactory: createFactoryWithValidation,
  isValidElement: isValidElement,

  version: ReactVersion,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner: ReactCurrentOwner,
    // Used by renderers to avoid bundling object-assign twice in UMD bundles:
    assign: _assign
  }
};

{
  _assign(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
    // These should not be included in production.
    ReactDebugCurrentFrame: ReactDebugCurrentFrame,
    // Shim for React DOM 16.0.0 which still destructured (but not used) this.
    // TODO: remove in React 17.0.
    ReactComponentTreeHook: {}
  });
}



var React$2 = Object.freeze({
	default: React
});

var React$3 = ( React$2 && React ) || React$2;

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
var react = React$3['default'] ? React$3['default'] : React$3;

module.exports = react;
  })();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(4);
  var warning = __webpack_require__(5);
  var ReactPropTypesSecret = __webpack_require__(15);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ })
/******/ ]);