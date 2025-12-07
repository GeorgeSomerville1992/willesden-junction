import { useState, useEffect } from "react";
import { Game } from "./components/Game";
import { CountDown } from "./components/CountDown";
import { NotStarted } from "./components/NotStarted";
import { sendEvent } from "./server/api";
import { Instructions } from "./components/Instructions";
import Toastify from "toastify-js";

import "./App.css";

function App() {
  const [gameString, setGameString] = useState("");
  const [gameResults, setGameResults] = useState("");
  const [gameStateKey, setGameStateKey] =
    useState<keyof typeof gameState>("notStarted");

  const handleSetGame = (gameString: string) => {
    setGameString(gameString);
    setGameStateKey("countDown");
  };

  const handleGameOver = (correctGuesses: number, incorrectGuesses: number) => {
    setGameResults(
      `Game over! Correct guesses: ${correctGuesses}, Incorrect guesses: ${incorrectGuesses}`,
    );

    setGameStateKey("finished");
  };

  const handleGameReady = () => {
    setGameStateKey("started");
  };

  const handleReset = () => {
    setGameStateKey("notStarted");
  };

  useEffect(() => {
    if (gameStateKey !== "notStarted") {
      sendEvent(`Game ${gameState[gameStateKey].message}`);
      Toastify({
        text: `Game: ${gameState[gameStateKey].message}`,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #d4c0d9, #a982b4)",
        },
      }).showToast();
    }
  }, [gameStateKey]);

  const gameState = {
    notStarted: {
      message: "",
      component: (
        <>
          <Instructions />
          <NotStarted handleSetGame={handleSetGame} />
        </>
      ),
    },
    countDown: {
      message: "Starting Soon...",
      component: <CountDown handleGameReady={handleGameReady} />,
    },
    started: {
      message: "Started",
      component: (
        <Game gameString={gameString} handleGameOver={handleGameOver} />
      ),
    },
    finished: {
      message: "Finished",
      component: (
        <>
          <h2 className="grow content-center">{gameResults}</h2>
          <button onClick={handleReset} className="btn btn-primary mt-4">
            Reset
          </button>
        </>
      ),
    },
  };

  return (
    <main className="h-full flex flex-col box-border dark">
      <header>
        <nav className="nav">
          <h1 className="">N-Back challenge</h1>
        </nav>
      </header>
      <div className="game-container sm:max-w-2x flex flex-col justify-between h-full">
        {gameState[gameStateKey].component}
      </div>
    </main>
  );
}

export default App;
