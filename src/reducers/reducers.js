import { ActionType } from '../actions/actions';
import { calculateWinner } from '../utils/calculate_winner';

const initialState = {
  historyList: [{
    history: [{
      squares: Array(Math.pow(3, 2)).fill(null),
      chengeSquare: 0,
    }],
    winner: 0,
  }],
  xIsNext: true,
  stepNumber: 0,
  sortAscending: true,
  isThree: true,
  isCpu: true,
  xIsCpu: false,
  cpuDifficulty: false,
  modalIsOpen: false,
  blockModalIsOpen: false,
};

export default function ticTacToeApp(state = initialState, action) {
  switch (action.type) {
    case ActionType.RESET: {
      const historyList = state.historyList.slice(0, state.historyList.length);
      historyList[historyList.length - 1] = {
        history: [{
          squares: Array(Math.pow(state.isThree ? 3 : 5, 2)).fill(null),
          chengeSquare: 0,
        }],
        winner: 'playing',
      };
      return Object.assign({}, state, {
        historyList,
        xIsNext: true,
        stepNumber: 0,
        sortAscending: true,
      });
    }
    case ActionType.NEW_GAME: {
      const historyList = state.historyList.slice(0, state.historyList.length);
      historyList[historyList.length] = {
        history: [{
          squares: Array(Math.pow(state.isThree ? 3 : 5, 2)).fill(null),
          chengeSquare: 0,
        }],
        winner: 'playing',
      };
      return Object.assign({}, state, {
        historyList,
        xIsNext: true,
        stepNumber: 0,
        sortAscending: true,
      });
    }
    case ActionType.RECODE_GAME: {
      const historyList = state.historyList.slice(0, state.historyList.length);
      const history = historyList[historyList.length - 1].history.slice(0, state.stepNumber + 1);
      const current = history[state.stepNumber];
      const winner = calculateWinner(current.squares, state.isThree ? 3 : 5);
      historyList[historyList.length - 1] = {
        history,
        winner: winner ? current.squares[winner[0]] : 'Draw',
      };
      return Object.assign({}, state, {
        historyList,
      });
    }
    case ActionType.PUT_MARK: {
      const historyList = state.historyList.slice(0, state.historyList.length);
      const history = historyList[historyList.length - 1].history.slice(0, state.stepNumber + 1);
      const current = history[state.stepNumber];
      const squares = current.squares.slice();
      squares[action.chengeSquare] = state.xIsNext ? 'X' : 'O';
      historyList[historyList.length - 1] = {
        history: history.concat([{
          squares,
          chengeSquare: action.chengeSquare,
        }]),
        winner: 0,
      };
      return Object.assign({}, state, {
        historyList,
        stepNumber: history.length,
        xIsNext: !state.xIsNext,
      });
    }
    case ActionType.JUMP_TO: {
      return Object.assign({}, state, {
        stepNumber: action.step,
        xIsNext: (action.step % 2) === 0,
      });
    }
    case ActionType.CHENGE_SORT: {
      return Object.assign({}, state, {
        sortAscending: !state.sortAscending,
      });
    }
    case ActionType.CHENGE_MODE: {
      return Object.assign({}, state, {
        isThree: !state.isThree,
      });
    }
    case ActionType.CHENGE_CPU: {
      return Object.assign({}, state, {
        isCpu: !state.isCpu,
      });
    }
    case ActionType.CHENGE_CPU_ORDER: {
      return Object.assign({}, state, {
        xIsCpu: !state.xIsCpu,
      });
    }
    case ActionType.CHENGE_CPU_DIFFICULTY: {
      return Object.assign({}, state, {
        cpuDifficulty: !state.cpuDifficulty,
      });
    }
    case ActionType.OPEN_MODAL: {
      return Object.assign({}, state, {
        modalIsOpen: true,
      });
    }
    case ActionType.CLOSE_MODAL: {
      return Object.assign({}, state, {
        modalIsOpen: false,
      });
    }
    case ActionType.OPEN_BLOCK_MODAL: {
      return Object.assign({}, state, {
        blockModalIsOpen: true,
      });
    }
    case ActionType.CLOSE_BLOCK_MODAL: {
      return Object.assign({}, state, {
        blockModalIsOpen: false,
      });
    }
    default: {
      return state;
    }
  }
}
