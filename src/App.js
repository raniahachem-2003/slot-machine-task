import React from "react";
import SlotMachine from "./components/SlotMachine";
import "./App.css";

function App() {
  return (
    <div className="app-background">
      {/* Background video */}
      <video
        className="bg-video"
        src="/images/video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Semi-transparent overlay */}
      <div className="overlay"></div>

      {/* Content on top of video */}
      <div className="content-overlay">
        <h1 className="title">🎰 Neon 777</h1>

               

        {/* Slot machine component */}
        <SlotMachine />
      </div>
    </div>
  );
}

export default App;
