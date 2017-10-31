import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Game from './containers/Game';
import reducer from './reducers';

import './index.css';

const store = createStore(reducer);

render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('root'),
);
