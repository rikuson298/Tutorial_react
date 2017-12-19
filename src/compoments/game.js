import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Board from '../compoments/board';
import GameInfo from '../compoments/game_info';
import SettingModal from '../compoments/setting_modal';
import { calculateWinner } from '../utils/calculate_winner';
import { recodeGame, newGame, openModal, reset } from '../actions/actions';

class Game extends React.Component {

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
        
        //対局履歴リスト表示確認用
        historyList.map((history, index) => console.log(index + 1  + ". Result:" + history.winner));
    }
    
    render() {
        const historyList = this.props.state.historyList;
        const history = historyList[historyList.length - 1].history;
        const current = history[this.props.state.stepNumber];
        const winner = calculateWinner(current.squares, this.props.state.isThree ? 3 : 5);
        
        return (
            <div key="game" className="game">
                <div key="game-board" className="game-board">
                    <Board key="board"
                        victoryLine={winner}
                    />
                </div>
                <div key="game-info" className="game-info">
                    <button onClick={() => this.init()}>New Game</button>
                    <GameInfo key="info"
                        winner={winner}
                    />
                </div>
                <SettingModal key="setting" />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {state};
  }

export default connect(mapStateToProps, {
                            recodeGame,
                            newGame,
                            openModal,
                            reset})(Game);