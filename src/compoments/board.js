import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Square from './square';

class Board extends React.Component {
    renderSquare(i) {
        const isHighlight = this.props.victoryLine ? this.props.victoryLine.indexOf(i) >= 0 : false;
        return <Square 
                    key={i}
                    index={i}
                    highlight={isHighlight}
                />;
    }

    render() {
        const mode = this.props.state.isThree ? 3 : 5;
        const boardRows = Array.apply(null, Array(mode)).map((value, col) => {
            const squares = Array.apply(null, Array(mode)).map((value, row) => {
                return this.renderSquare(col * mode + row)});
            return <div key={col} className="board-row">{squares}</div>;
        });

        return (
            <div key="squares">{boardRows}</div>
        );
    }
}

function mapStateToProps(state) {
    return {state};
}

export default connect(mapStateToProps)(Board);