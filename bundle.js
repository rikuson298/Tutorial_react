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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function Square(props) {
    return React.createElement(
        "button",
        { key: props.index, className: "square", onClick: () => props.onClick() },
        props.value
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return React.createElement(Square, { index: i, value: this.props.squares[i], onClick: () => this.props.onClick(i) });
    }

    render() {
        let col, row;
        let boardRows = new Array();
        for (col = 0; col < 3; col++) {
            let squares = new Array();
            for (row = 0; row < 3; row++) {
                squares.push(this.renderSquare(col * 3 + row));
            }
            boardRows.push(React.createElement(
                "div",
                { key: col, className: "board-row" },
                squares
            ));
        }

        return React.createElement(
            "div",
            null,
            boardRows
        );
    }
}

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                chengeSquare: 0
            }],
            xIsNext: true,
            stepNumber: 0
        };
    }

    handleClick(i) {
        var history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                chengeSquare: i
            }]),
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

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? 'Go to Move ' + convartFormat(step.chengeSquare) : 'Go to Game start';
            return React.createElement(
                "li",
                { key: move },
                React.createElement(
                    "button",
                    {
                        style: this.state.stepNumber === move ? { fontWeight: 'bold' } : { fontWeight: 'normal' },
                        onClick: () => this.jumpTo(move) },
                    desc
                )
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return React.createElement(
            "div",
            { className: "game" },
            React.createElement(
                "div",
                { className: "game-board" },
                React.createElement(Board, {
                    squares: current.squares,
                    onClick: i => this.handleClick(i)
                })
            ),
            React.createElement(
                "div",
                { className: "game-info" },
                React.createElement(
                    "div",
                    null,
                    status
                ),
                React.createElement(
                    "ol",
                    null,
                    moves
                )
            )
        );
    }
}

ReactDOM.render(React.createElement(Game, null), document.getElementById('root'));

function calculateWinner(squares) {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function convartFormat(chengeSquare) {
    let col = 1;
    let row = 1;
    if (chengeSquare) {
        col = Math.floor(chengeSquare / 3) + 1;
        row = chengeSquare % 3 + 1;
    }
    return '(' + col + ', ' + row + ')';
}

/***/ })
/******/ ]);