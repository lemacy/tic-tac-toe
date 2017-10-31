import * as types from './types';
import { calculateWinner } from '../../logic/tic-tac-toe';

const firstPlayer = 'X';

const initialState = {
  currentPlayer: firstPlayer,
  gridWidth: 5,
  gridHeight: 5,
  victoryNumber: 4,
  gridState: null,
  history: [],
};

initialState.gridState = Array(initialState.gridWidth * initialState.gridHeight).fill(null);
initialState.history = [initialState.gridState];

const reducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case types.VICTORY_NUMBER_CHANGE:
    case types.GRID_WIDTH_CHANGE:
    case types.GRID_HEIGHT_CHANGE:
    case types.GAME_RESET: {
      const victoryNumber = types.VICTORY_NUMBER_CHANGE === action.type ? payload.value : state.victoryNumber;
      const gridWidth = types.GRID_WIDTH_CHANGE === action.type ? payload.value : state.gridWidth;
      const gridHeight = types.GRID_HEIGHT_CHANGE === action.type ? payload.value : state.gridHeight;
      const gridState = Array(gridWidth * gridHeight).fill(null);
      const history = [gridState];
      const currentPlayer = firstPlayer;

      return {
        ...state, gridState, history, currentPlayer, gridWidth, gridHeight, victoryNumber,
      };
    }

    case types.PLAYER_MOVE: {
      const currentPlayer = payload.player === 'X' ? 'O' : 'X';
      const gridState = state.gridState.slice();

      if (gridState[payload.position]
        || calculateWinner(gridState, state.gridWidth, state.gridHeight, state.victoryNumber).length
      ) {
        return state;
      }

      gridState[payload.position] = { value: payload.player, highlighted: false };

      calculateWinner(gridState, state.gridWidth, state.gridHeight, state.victoryNumber).forEach((element) => {
        gridState[element] = { ...gridState[element], ...{ highlighted: true } };
      });

      const history = [...state.history, gridState];

      return {
        ...state, gridState, history, currentPlayer,
      };
    }
    case types.HISTORY_JUMP: {
      const { step } = payload;
      const history = state.history.slice(0, step);
      const gridState = history[step - 1];
      const currentPlayer = step % 2 ? 'X' : 'O';

      return {
        ...state, history, currentPlayer, gridState,
      };
    }
    default:
      return state;
  }
};

export default reducer;
