import React from 'react';
import { connect } from 'react-redux';
import ToggleButton from 'react-toggle-button';
import { jumpTo, chengeSort } from '../actions/actions';

class GameInfo extends React.Component {
  render() {
    const historyList = this.props.state.historyList;
    const history = historyList[historyList.length - 1].history;
    const current = history[this.props.state.stepNumber];
    const mode = this.props.state.isThree ? 3 : 5;
    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to Move ${convartFormat(step.chengeSquare, mode)}` :
        'Go to Game start';
      return (
        <li key={move}>
          <button
            style={this.props.state.stepNumber === move ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}
            onClick={() => this.props.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });
    if (!this.props.state.sortAscending) {
      moves.reverse();
    }

    let status;
    if (this.props.winner) {
      status = `Winner: ${current.squares[this.props.winner[0]]}`;
    } else if (this.props.state.stepNumber === Math.pow(mode, 2)) {
      status = 'This Game is Draw';
    } else {
      status = `Next player: ${this.props.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div>
        <div>{status}</div>
        <ToggleButton
          inactiveLabel="9→1"
          activeLabel="1→9"
          value={this.props.state.sortAscending}
          onToggle={() => this.props.chengeSort()}
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
  return `(${col}, ${row})`;
}

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps, {
  jumpTo,
  chengeSort,
})(GameInfo);
