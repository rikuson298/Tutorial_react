import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Board from '../compoments/board';
import GameInfo from '../compoments/game_info';
import SettingModal from '../compoments/setting_modal';
import BlockModal from '../compoments/block_modal';
import HistoryModal from '../compoments/history_modal';
import Menubar from '../compoments/menubar';
import { calculateWinner } from '../utils/calculate_winner';
import { chooseCpuSquare } from '../utils/cpu_brain';
import { putMark } from '../actions/actions';
import { setTimeout } from 'timers';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blockModalIsOpen: false,
      historyModalIsOpen: false,
    };
  }

  componentWillReceiveProps(newProps) {
    const { state } = newProps;
    const {
      modalIsOpen, isCpu, xIsCpu, xIsNext, historyList, stepNumber, isThree, showHistory,
    } = state;
    if (!showHistory && !modalIsOpen && isCpu && xIsCpu === xIsNext) {
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
    const history = historyList[this.props.state.showHistory ? this.props.state.historyNo - 1 : historyList.length - 1].history;
    const current = history[this.props.state.stepNumber];
    const winner = calculateWinner(current.squares, this.props.state.isThree ? 3 : 5);
    const selectedMode = this.props.state.showHistory ? 'Show History' : this.props.state.isCpu ? 'CPU Fight' : 'Player Fight';
    const labelClass = this.props.state.showHistory ? 'selected-history' : this.props.state.isCpu ? 'selected-cpu' : 'selected-player';
    return (
      <div key="tictactoe" className="tictactoe">
        <div key="header" className="l-header">
          <Menubar
            key="menu"
            openHistoryModal={() => this.setState({ historyModalIsOpen: true })}
          />
          <p key="selected-mode" className={labelClass}>{selectedMode}</p>
        </div>
        <div key="game" className="l-game">
          <div key="game-board" className="game-board">
            <Board
              key="board"
              victoryLine={winner}
            />
          </div>
          <div key="game-info" className="l-info">
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
          <HistoryModal
            key="history"
            historyModalIsOpen={this.state.historyModalIsOpen}
            closeModal={() => this.setState({ historyModalIsOpen: false })}
          />
        </div>
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
  putMark,
})(Game);
