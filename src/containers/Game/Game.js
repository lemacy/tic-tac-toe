import React from 'react';

import Square from '../Square/Square';
import History from '../History';
import Config from '../Config';
import './Game.css';

const Game = ({
  gridWidth, gridState, currentPlayer, playerMove,
}) => (
  <div className="app">
    <Config />
    <div className="game">
      <h1>Game</h1>
      <div>
        {gridState.map((square, key) => (
          <Square
            key={key}
            sameRow={key % gridWidth}
            {...square}
            onClick={() => playerMove(currentPlayer)(key)}
          />
        ))}
      </div>
    </div>
    <History />
  </div>
);

export default Game;
