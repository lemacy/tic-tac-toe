import React from 'react';

import './Square.css';

const Square = ({
  onClick, highlighted, value, sameRow,
}) => (
  <button
    onClick={onClick}
    className={`square ${highlighted ? 'highlighted' : ''} ${!sameRow ? 'break_row' : ''}`}
  >
    {value}
  </button>
);

export default Square;
