import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Board from '../compoments/board';
import GameInfo from '../compoments/game_info';
import SettingModal from '../compoments/setting_modal';
import BlockModal from '../compoments/block_modal';
import { calculateWinner } from '../utils/calculate_winner';
import { chooseCpuSquare } from '../utils/cpu_brain';
import { recodeGame, newGame, openModal, reset, putMark, openBlockModal, closeBlockModal } from '../actions/actions';
import { setTimeout } from 'timers';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blockModalIsOpen: false,
    };
  }

  componentWillReceiveProps(newProps) {
    const { state } = newProps;
    const {
      modalIsOpen, isCpu, xIsCpu, xIsNext, historyList, stepNumber, isThree,
    } = state;
    if (!modalIsOpen && isCpu && xIsCpu === xIsNext) {
      const history = historyList[historyList.length - 1].history;
      const current = history[stepNumber];
      const mode = isThree ? 3 : 5;
      if (calculateWinner(current.squares, mode) || stepNumber === Math.pow(mode, 2)) {
        return;
      }
      this.setState({ blockModalIsOpen: true });

      this.putCpu(current.squares).then(() => {
        this.setState({ blockModalIsOpen: false });
      });
    }
  }

  init() {
    const historyList = this.props.state.historyList.slice(0, this.props.state.historyList.length);
    const history = historyList[historyList.length - 1].history.slice(0, this.props.state.stepNumber + 1);
    const current = history[this.props.state.stepNumber];
    const winner = calculateWinner(current.squares, this.props.state.isThree ? 3 : 5);
    if (winner || this.props.state.stepNumber === Math.pow(this.props.state.isThree ? 3 : 5, 2)) {
      this.props.recodeGame();
      this.props.newGame();
    } else {
      this.props.reset();
    }
    this.props.openModal();

    // 対局履歴リスト表示確認用
    historyList.map((history, index) => console.log(`${index + 1}. Result:${history.winner}`));
  }

  putCpu(squares) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.props.putMark(chooseCpuSquare(squares, this.props.state.isThree ? 3 : 5, this.props.state.cpuDifficulty, this.props.xIsCpu));
        resolve();
      }, Math.random(1500) + 500);
    });
  }

  render() {
    const historyList = this.props.state.historyList;
    const history = historyList[historyList.length - 1].history;
    const current = history[this.props.state.stepNumber];
    const winner = calculateWinner(current.squares, this.props.state.isThree ? 3 : 5);
    return (
      <div key="game" className="game">
        <div key="game-board" className="game-board">
          <Board
            key="board"
            victoryLine={winner}
          />
        </div>
        <div key="game-info" className="game-info">
          <button onClick={() => this.init()}>New Game</button>
          <GameInfo
            key="info"
            winner={winner}
          />
        </div>
        <SettingModal key="setting" />
        <BlockModal
          key="block"
          blockModalIsOpen={this.state.blockModalIsOpen}
          closeModal={() => this.setState({ blockModalIsOpen: false })}
        />
      </div>
    );
  }
}

Game.propTypes = {
  state: PropTypes.shape({
    modalIsOpen: PropTypes.bool.isRequired,
  }).isRequired,

};

function mapStateToProps(state) {
  return { state };
}


export default connect(mapStateToProps, {
  recodeGame,
  newGame,
  openModal,
  reset,
  putMark,
  openBlockModal,
  closeBlockModal,
})(Game);
