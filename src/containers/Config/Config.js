import React from 'react';

import './Config.css';

const Config = ({
  gridWidth, gridHeight, victoryNumber, gridWidthChange, gridHeightChange, victoryNumberChange, gameReset,
}) => (
  <div className="config">
    <h1>Config</h1>
    <p>
      <label htmlFor="gridWidth">Width:
        <input type="number" id="gridWidth" defaultValue={gridWidth} onChange={e => gridWidthChange(e.target.value)} />
      </label>
    </p>
    <p>
      <label htmlFor="gridHeight">Height:
        <input type="number" id="gridHeight" defaultValue={gridHeight} onChange={e => gridHeightChange(e.target.value)} />
      </label>
    </p>
    <p>
      <label htmlFor="victoryNumber">
        Victory number:
        <input type="number" id="victoryNumber" defaultValue={victoryNumber} onChange={e => victoryNumberChange(e.target.value)} />
      </label>
    </p>
    <p>
      <button onClick={gameReset}>
        Reset
      </button>
    </p>
  </div>
);

export default Config;
