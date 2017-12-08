import React from 'react';
import ReactDOM from 'react-dom';
import ToggleButton from 'react-toggle-button';

class GameInfo extends React.Component {
    render() {
        const current = this.props.history[this.props.stepNumber];
        const moves = this.props.history.map((step, move) => {
            const desc = move ?
                'Go to Move ' + convartFormat(step.chengeSquare, this.props.mode) :
                'Go to Game start';
            return (
                <li key={move}>
                    <button 
                        style={this.props.stepNumber === move ? {fontWeight: 'bold'} : {fontWeight: 'normal'}} 
                        onClick={() => this.props.onClickList(move)}>
                        {desc}
                    </button>
                </li>
            );
        });
        if(!this.props.sortAscending){
            moves.reverse();
        }

        let status;
        if (this.props.winner) {
            status = 'Winner: ' + current.squares[this.props.winner[0]];
        } else if (this.props.stepNumber === Math.pow(this.props.mode, 2)) {
            status = 'This Game is Draw'
        } else {
            status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');               
        }

        return (
            <div>
                <div>{status}</div>
                <ToggleButton
                    inactiveLabel="9→1"
                    activeLabel="1→9"
                    value={this.props.sortAscending}
                    onToggle={() => this.props.onToggle(this.props.sortAscending)} 
                />
                <ol>{moves}</ol>
            </div>
        );
    }
}

function convartFormat(chengeSquare, mode) {
    let col = 1;
    let row = 1;
    if (chengeSquare) {
        col = Math.floor(chengeSquare / mode) + 1;
        row = (chengeSquare % mode) + 1;
    }
    return '(' + col + ', ' + row + ')'
}

export default GameInfo;