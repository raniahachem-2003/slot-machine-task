import React, { useState } from "react";
import Reel from "./Reel";
import "./SlotMachine.css";

const symbols = ["🍒", "🍋", "🍇", "🍊", "7️⃣", "💎", "⭐", "🔔"];
const payouts = {
  "🍒": 5,
  "🍋": 10,
  "🍊": 15,
  "🍇": 20,
  "🍉": 25,
  "🔔": 40,
  "⭐": 50,
  "7️⃣": 100,
};

// Load sounds from public folder
const spinSound = new Audio(process.env.PUBLIC_URL + "/sounds/spin.mp3");
const clickSound = new Audio(process.env.PUBLIC_URL + "/sounds/stop.mp3");
const winSound = new Audio(process.env.PUBLIC_URL + "/sounds/win.mp3");

function SlotMachine() {
  const [reels, setReels] = useState([0, 0, 0]);
  const [tempSymbols, setTempSymbols] = useState([0, 0, 0]);
  const [spinning, setSpinning] = useState(false);
  const [balance, setBalance] = useState(100);
  const [bet, setBet] = useState(5);
  const [win, setWin] = useState(0);
  const [winningReels, setWinningReels] = useState([]);

  // Spin logic
  const spin = () => {
    if (spinning) return;
    if (bet > balance) {
      alert("Not enough balance for this bet!");
      return;
    }

    setBalance(balance - bet);
    setWin(0);
    setSpinning(true);

    spinSound.currentTime = 0;
    spinSound.play();
    

    const results = Array(3)
      .fill()
      .map(() => Math.floor(Math.random() * symbols.length));

    let intervalCount = 0;
    const spinInterval = setInterval(() => {
      setTempSymbols(tempSymbols.map(() => Math.floor(Math.random() * symbols.length)));
      intervalCount++;
      if (intervalCount > 10) {
        clearInterval(spinInterval);
        setReels(results);
        setSpinning(false);

        // Stop spin sound and play click sound
        spinSound.pause();
        spinSound.currentTime = 0;
        clickSound.currentTime = 0;
        clickSound.play();

        checkWin(results);
      }
    }, 100);
  };

  // Check for win
  const checkWin = (res) => {
    if (res[0] === res[1] && res[1] === res[2]) {
      const prize = bet * payouts[symbols[res[0]]];
      setBalance((bal) => bal + prize);
      setWin(prize);
      setWinningReels([0, 1, 2]);


      winSound.currentTime = 0;
      winSound.play();
      setTimeout(() => setWinningReels([]), 1200);
    }
  };

  // Bet controls
  const increaseBet = () => {
    setBet((prev) => Math.min(prev + 1, balance));
  };
  const decreaseBet = () => {
    setBet((prev) => Math.max(prev - 1, 1));
  };
  const maxBet = () => {
    setBet(balance > 0 ? balance : 1);
  };

  return (
    <div className="slot-machine">
      <div className="info">
        <span>💰 Balance: ${balance}</span>
        <span>🎯 Bet: ${bet}</span>
        <span>🏆 Last Win: ${win}</span>
      </div>

      <div className="reels">
        {reels.map((symbolIndex, idx) => (
          <Reel
            key={idx}
            symbol={spinning ? tempSymbols[idx] : symbolIndex}
            symbols={symbols}
            spinning={spinning}
            isWinning={winningReels.includes(idx)}
            finalIndex={reels[idx]}
          />
        ))}
      </div>

      <div className="controls">
        <button onClick={decreaseBet} disabled={spinning}>-</button>
        <button onClick={increaseBet} disabled={spinning}>+</button>
        <button onClick={maxBet} disabled={spinning}>Max Bet</button>
        <button onClick={spin} disabled={spinning}>SPIN</button>
      </div>
    </div>
  );
}

export default SlotMachine;
