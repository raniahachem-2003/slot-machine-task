import React from "react";
import "./Controls.css";

function Controls({ bet, setBet, spin, maxBet, spinning }) {
  return (
    <div className="controls">
      <button disabled={spinning} onClick={() => setBet(Math.max(1, bet - 1))}>-</button>
      <button disabled={spinning} onClick={() => setBet(bet + 1)}>+</button>
      <button disabled={spinning} onClick={maxBet}>Max Bet</button>
      <button disabled={spinning} onClick={spin}>SPIN</button>
    </div>
  );
}

export default Controls;