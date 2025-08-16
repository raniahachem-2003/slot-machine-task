import React, { useEffect, useState, useRef } from "react";
import "./Reel.css";

export default function Reel({ symbol, symbols, spinning, isWinning, finalIndex }) {
  const [currentSymbols, setCurrentSymbols] = useState([symbols[0]]);
  const [position, setPosition] = useState(0);
  const symbolHeight = 100; // match CSS
  const totalSymbols = 20; // number of symbols to scroll
  const spinDuration = 1000; // spin time in ms
  const requestRef = useRef();

  // Helper: generate random sequence for scrolling
  const generateRandomSequence = () => {
    const arr = [];
    for (let i = 0; i < totalSymbols; i++) {
      const randomIndex = Math.floor(Math.random() * symbols.length);
      arr.push(symbols[randomIndex]);
    }
    return arr;
  };

  useEffect(() => {
    if (!spinning) {
      // Not spinning: show final symbol
      setCurrentSymbols([symbols[finalIndex]]);
      setPosition(0);
      return;
    }

    // Spinning: generate random sequence
    const sequence = generateRandomSequence();
    setCurrentSymbols(sequence);
    setPosition(0);

    let start = null;

    const animate = (time) => {
      if (!start) start = time;
      const elapsed = time - start;

      const progress = Math.min(elapsed / spinDuration, 1);
      const scrollPos = symbolHeight * totalSymbols * progress;
      setPosition(scrollPos);

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        // Stop: show only the final symbol
        setCurrentSymbols([symbols[finalIndex]]);
        setPosition(0);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestRef.current);
  }, [spinning, finalIndex, symbols]);

  return (
    <div className={`reel ${isWinning ? "win" : ""}`}>
      <div
        className="reel-items"
        style={{ transform: `translateY(-${position}px)` }}
      >
        {currentSymbols.map((s, idx) => (
          <div className="reel-symbol" key={idx}>
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}
