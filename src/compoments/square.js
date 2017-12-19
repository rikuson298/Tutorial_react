import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { putMark } from '../actions/actions';
import { calculateWinner } from '../utils/calculate_winner';

class Square extends React.Component {
    handleClick(i) {
        const historyList = this.props.state.historyList.slice(0, this.props.state.historyList.length);
        const history = historyList[historyList.length - 1].history.slice(0, this.props.state.stepNumber + 1);
        const current = history[this.props.state.stepNumber];
        const squares = current.squares.slice();
        if (calculateWinner(squares, this.props.state.isThree ? 3 : 5) || squares[i]) {
            return;
        }
        this.props.putMark(i);
    }
    
    render() {
        const historyList = this.props.state.historyList;
        const history = historyList[historyList.length - 1].history;
        const current = history[this.props.state.stepNumber];

        return (
            <button 
                key={this.props.index} 
                className="square" 
                onClick={i => this.handleClick(this.props.index)}
                style={this.props.highlight ? {backgroundColor: "yellow"} : {}}>
                {current.squares[this.props.index]}
            </button>
        );
    }
}

function mapStateToProps(state) {
    return {state};
}

export default connect(mapStateToProps, {putMark})(Square);