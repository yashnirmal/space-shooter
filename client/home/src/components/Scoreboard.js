import React from 'react';
import "./Scoreboard.css";

export default function Scoreboard() {

  return (
    <div className="scoreboard" id='scoreboard'>
      <div className="scoreboard-table">
        <div className="level-choose">
          <button data-status="checked">Easy</button>
          <button data-status="un-checked">Medium</button>
          <button data-status="un-checked">Hard</button>
          <button data-status="un-checked">Impossible</button>
        </div>
        <div className="players-list">
          <p>yashnirmal</p>
          <p>yashnirmal</p>
          <p>yashnirmal</p>
          <p>yashnirmal</p>
          <p>yashnirmal</p>
          <p>yashnirmal</p>
          <p>yashnirmal</p>
        </div>
      </div>
    </div>
  );
}
