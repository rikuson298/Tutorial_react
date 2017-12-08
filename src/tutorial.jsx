import React from 'react';
import ReactDOM from 'react-dom';
import Board from './compoments/board';
import GameInfo from './compoments/game_info';
import SettingModal from './compoments/setting_modal';

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            historyList: [{
                history: [{
                    squares: Array(Math.pow(3, 2)).fill(null),
                    chengeSquare: 0
                }],
                winner: 0
            }],
            xIsNext: true,
            stepNumber: 0,
            sortAscending: true,
            isThree: true,
            isCpu: false,
            modalIsOpen: false
        };
        this.closeModal = this.closeModal.bind(this);
    }

    init() {
        const historyList = this.state.historyList.slice(0, this.state.historyList.length);
        const history = historyList[historyList.length - 1].history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const modeSuares = this.getMode();
        const winner = calculateWinner(current.squares, modeSuares);
        let newHistorySeq = historyList.length;
        if (winner || this.state.stepNumber === Math.pow(modeSuares, 2)) {
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
                squares: Array(Math.pow(modeSuares, 2)).fill(null),
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
        this.openModal();
    }

    handleClick(i) {
        const historyList = this.state.historyList.slice(0, this.state.historyList.length);
        const history = historyList[historyList.length - 1].history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();
        if (calculateWinner(squares, this.getMode()) || squares[i]) {
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

    onToggleSort(value) {
        this.setState({
            sortAscending: !value,
        })
    }

    onToggleMode(value) {
        this.setState({
            isThree: !value,
        })
    }

    onToggleCpu(value) {
        this.setState({
            isCpu: !value,
        })
    }

    getMode() {
        return this.state.isThree ? 3 : 5;
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }
    
    closeModal() {
        this.setState({modalIsOpen: false});
    }
    
    render() {
        const historyList = this.state.historyList;
        const history = historyList[historyList.length - 1].history;
        const current = history[this.state.stepNumber];
        const modeSuares = this.getMode();
        const winner = calculateWinner(current.squares, modeSuares);
        
        return (
            <div key="game" className="game">
                <div key="game-board" className="game-board">
                    <Board key="board"
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                        victoryLine={winner}
                        mode={modeSuares}
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
                        onToggle={value => this.onToggleSort(value)}
                        mode={modeSuares}
                    />
                </div>
                <SettingModal key="setting" 
                        show={this.state.modalIsOpen}
                        isThree={this.state.isThree} 
                        isCpu={this.state.isCpu} 
                        closeModal={this.closeModal}
                        onToggleMode={value => this.onToggleMode(value)}
                        onToggleCpu={value => this.onToggleCpu(value)}/>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares, mode) {
    if(mode === 3) {
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
    } else {
        const lines = [
            [0, 1, 2, 3, 4],
            [5, 6, 7, 8, 9],
            [10, 11, 12, 13, 14],
            [15, 16, 17, 18, 19],
            [20, 21, 22, 23, 24],
            [0, 5, 10, 15, 20],
            [1, 6, 11, 16, 21],
            [2, 7, 12, 17, 22],
            [3, 8, 13, 18, 23],
            [4, 9, 14, 19, 24],
            [0, 6, 12, 18, 24],
            [4, 8, 12, 16, 20],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c, d, e] = lines[i];
            if (squares[a] 
                    && squares[a] === squares[b] 
                    && squares[a] === squares[c] 
                    && squares[a] === squares[d] 
                    && squares[a] === squares[e]) {
                return lines[i];
            }
        }
    }
    return null;
}