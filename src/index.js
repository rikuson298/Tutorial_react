import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ticTacToeApp from './reducers/reducers';
import Game from './compoments/game';

const store = createStore(ticTacToeApp);

ReactDOM.render(
  <Provider store={store}>
      <Game />
    </Provider>,
    document.getElementById('root'),
);
