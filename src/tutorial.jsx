function Square(props) {
    return (
        <button key={props.index} className="square" onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square index={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
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
        <div>
            {boardRows}
        </div>
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
        const history = this.state.history;
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

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        
        return (
            <div className="game">
                <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={i => this.handleClick(i)}
                />
                </div>
                <div className="game-info">
                    <div>{status}</div>
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
        row = (chengeSquare % 3) + 1;
    }
    return '(' + col + ', ' + row + ')'
}