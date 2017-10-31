import * as types from './types';

const playerMove = player => position => (
  {
    type: types.PLAYER_MOVE,
    payload: {
      player,
      position,
    },
  }
);

const gridWidthChange = value => (
  {
    type: types.GRID_WIDTH_CHANGE,
    payload: {
      value,
    },
  }
);

const gridHeightChange = value => (
  {
    type: types.GRID_HEIGHT_CHANGE,
    payload: {
      value,
    },
  }
);

const victoryNumberChange = value => (
  {
    type: types.VICTORY_NUMBER_CHANGE,
    payload: {
      value,
    },
  }
);

const historyJump = step => (
  {
    type: types.HISTORY_JUMP,
    payload: {
      step,
    },
  }
);

const gameReset = () => (
  {
    type: types.GAME_RESET,
  }
);

export {
  gameReset, playerMove, historyJump,
  gridWidthChange, gridHeightChange, victoryNumberChange,
};
