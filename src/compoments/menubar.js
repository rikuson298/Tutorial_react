import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { calculateWinner } from '../utils/calculate_winner';
import { recodeGame, newGame, openModal, reset } from '../actions/actions';

class Menubar extends React.Component {
  init() {
    const historyList = this.props.state.historyList.slice(0, this.props.state.historyList.length);
    const history = historyList[historyList.length - 1].history.slice(0, this.props.state.stepNumber + 1);
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares, this.props.state.isThree ? 3 : 5);
    if (winner || history.length - 1 === Math.pow(this.props.state.isThree ? 3 : 5, 2)) {
      this.props.recodeGame();
      this.props.newGame();
    } else {
      this.props.reset();
    }
    this.props.openModal();
    window.localStorage.setItem('tictactoe', JSON.stringify(historyList));
  }

  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect fluid>
          <Navbar.Header>
            <Navbar.Brand>
              TicTacToe
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullLeft>
              <NavItem eventKey={1} onClick={() => this.init()}>New Game</NavItem>
              <NavItem eventKey={2} onClick={() => this.props.openHistoryModal()}>View History</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps, {
  recodeGame,
  newGame,
  openModal,
  reset,
})(Menubar);
