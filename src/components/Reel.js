import React from "react";
import "./Reel.css";

export default function Reel({ symbol,symbols, spinning, isWinning }) {
  return (
    
     
<div className={`reel ${isWinning ? "win" : ""}`}>
      <div className="symbol" >{symbols[symbol]}</div>
    </div>
  );

}


