import React from 'react';
import ReactDOM from 'react-dom';
import {Square} from './square';

class Board extends React.Component {
    renderSquare(i) {
        const isHighlight = this.props.victoryLine ? this.props.victoryLine.indexOf(i) >= 0 : false;
        return <Square
                    key={i}
                    index={i}
                    value={this.props.squares[i]}
                    highlight={isHighlight}
                    onClick={() => this.props.onClick(i)}
                />;
    }

    render() {
        const boardRows = Array.apply(null, Array(this.props.mode)).map((value, col) => {
            const squares = Array.apply(null, Array(this.props.mode)).map((value, row) => {
                return this.renderSquare(col * this.props.mode + row)});
            return <div key={col} className="board-row">{squares}</div>;
        });

        return (
            <div key="squares">{boardRows}</div>
        );
    }
}

export default Board;
