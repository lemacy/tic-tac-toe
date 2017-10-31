import { combineReducers } from 'redux';

import game from '../models/game/reducer';

const ticTacToe = combineReducers({
  game,
});

export default ticTacToe;
