import Board from './compoments/board'
import GameInfo from './compoments/game_info'

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            historyList: [{
                history: [{
                    squares: Array(9).fill(null),
                    chengeSquare: 0
                }],
                winner: 0
            }],
            xIsNext: true,
            stepNumber: 0,
            sortAscending: true,
        };
    }

    init() {
        const historyList = this.state.historyList.slice(0, this.state.historyList.length);
        const history = historyList[historyList.length - 1].history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let newHistorySeq = historyList.length;
        if (winner || this.state.stepNumber === 9) {
            let result = winner ? current.squares[winner[0]] : "Draw";
            historyList[newHistorySeq - 1] = {
                history: history,
                winner: result,
            };
        } else {
            newHistorySeq = newHistorySeq - 1;
        }
        historyList[newHistorySeq] = {
            history: [{
                squares: Array(9).fill(null),
                chengeSquare: 0
            }],
            winner: "playing",
        };
        historyList.map((history, index) => console.log(index + 1  + ". Result:" + history.winner));
        this.setState({
            historyList: historyList,
            xIsNext: true,
            stepNumber: 0,
            sortAscending: true,
            result: false,
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
            winner: 0,
        };

        this.setState({
            historyList: historyList,
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    onToggle(value) {
        this.setState({
            sortAscending: !value,
        })
    }
    
    render() {
        const historyList = this.state.historyList;
        const history = historyList[historyList.length - 1].history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        
        return (
            <div key="game" className="game">
                <div key="game-board" className="game-board">
                    <Board key="board"
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                        victoryLine={winner}
                    />
                </div>
                <div key="game-info" className="game-info">
                    <button onClick={() => this.init()}>New Game</button>
                    <GameInfo key="info"
                        history={history}
                        winner={winner}
                        stepNumber={this.state.stepNumber}
                        xIsNext={this.state.xIsNext}
                        sortAscending={this.state.sortAscending}
                        onClickList={step => this.jumpTo(step)}
                        onToggle={value => this.onToggle(value)}
                    />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return lines[i];
        }
    }
    return null;
}