import React from 'react';

import './History.css';

const History = ({ history, historyJump }) => (
  <div className="history">
    <h1>History</h1>
    <ul>
      {history.map((step, key) => (
        <ol>
          <a key={key} href="#" onClick={(e) => { e.preventDefault(); historyJump(step.stepNumber); }}>
            {step.label}
          </a>
        </ol>
      ))}
    </ul>
  </div>
);

export default History;
