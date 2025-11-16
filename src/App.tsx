import { useState } from "react";
import { Game } from "./Game";
import { GetReady } from "./GetReady";
import { NotStarted } from "./NotStarted";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [gameResults, setGameResults] = useState("");
  const [gameStateKey, setGameStateKey] =
    useState<keyof typeof gameState>("notStarted");

  const handleSetGame = (name: string) => {
    setName(name);
    setGameStateKey("getReady");
  };

  // simply just rerender the game component with new props to reset its state!
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

  const gameState = {
    notStarted: () => <NotStarted handleSetGame={handleSetGame} />,
    getReady: () => {
      return <GetReady handleGameReady={handleGameReady} />;
    },
    started: () => <Game nBack={name} handleGameOver={handleGameOver} />,
    finished: () => (
      <>
        <p className="grow">{gameResults}</p>
        <button className="btn-primary w-full" onClick={handleReset}>
          Reset
        </button>
      </>
    ),
  };

  return (
    <main className="h-full flex flex-col box-border">
      <header className="grow">
        <h1 className="text-7xl">N-Back challange</h1>
      </header>
      {gameState[gameStateKey]()}
    </main>
  );
}

export default App;
