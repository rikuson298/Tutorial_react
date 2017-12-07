import ToggleButton from 'react-toggle-button'

function Square(props) {
    return (
        <button 
            key={props.index} 
            className="square" 
            onClick={() => props.onClick()}
            style={props.highlight ? {backgroundColor: "yellow"} : {}}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        const isHighlight = this.props.victoryLine ? this.props.victoryLine.indexOf(i) >= 0 : false;
        return <Square 
                    key={i} 
                    index={i} 
                    value={this.props.squares[i]} 
                    highlight={isHighlight}
                    onClick={() => this.props.onClick(i)} />;
    }

    render() {
        let col, row;
        let boardRows = new Array();
        for (col = 0; col < 3; col++) {
            let squares = new Array();
            for (row = 0; row < 3; row++) {
                squares.push(this.renderSquare(col * 3 + row));
            }
            boardRows.push(<div key={col} className="board-row">{squares}</div>);
        }

        return (
            <div key="squares">{boardRows}</div>
        );
    }
}

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
        historyList[historyList.length -1] = {
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
    
    render() {
        const historyList = this.state.historyList;
        const history = historyList[historyList.length - 1].history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to Move ' + convartFormat(step.chengeSquare) :
                'Go to Game start';
            return (
                <li key={move}>
                    <button 
                        style={this.state.stepNumber === move ? {fontWeight: 'bold'} : {fontWeight: 'normal'}} 
                        onClick={() => this.jumpTo(move)}>
                        {desc}
                    </button>
                </li>
            );
        });
        if(!this.state.sortAscending){
            moves.reverse();
        }

        let status;
        if (winner) {
            status = 'Winner: ' + current.squares[winner[0]];
        } else if (this.state.stepNumber === 9) {
            status = 'This Game is Draw'
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');               
        }
        
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
                    <div>{status}</div>
                    <button onClick={() => this.init()}>New Game</button>
                    <ToggleButton
                        inactiveLabel="9→1"
                        activeLabel="1→9"
                        value={this.state.sortAscending}
                        onToggle={(value) => {
                            this.setState({
                                sortAscending: !value,
                            })
                        }} />
                    <ol>{moves}</ol>
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

function convartFormat(chengeSquare) {
    let col = 1;
    let row = 1;
    if (chengeSquare) {
        col = Math.floor(chengeSquare / 3) + 1;
        row = (chengeSquare % 3) + 1;
    }
    return '(' + col + ', ' + row + ')'
}