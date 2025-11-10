import { useState } from "react";
import { Game } from "./Game";
import { GetReady } from "./GetReady";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [getReady, setGetReady] = useState(false);
  const [gameResults, setGameResults] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    // do something here
    e.preventDefault();
    // stop browser refresh
    setGetReady(true);
  };

  const handleGameOver = (correctGuesses: number, incorrectGuesses: number) => {
    console.log(
      "Game over! Correct guesses:",
      correctGuesses,
      "Incorrect guesses:",
      incorrectGuesses,
    );
    setGameStarted(false);
    setName("");
    setGameResults(
      `Game over! Correct guesses: ${correctGuesses}, Incorrect guesses: ${incorrectGuesses}`,
    );
  };

  const handleGameReady = () => {
    setGetReady(false);
    setGameStarted(true);
  };

  const handleReset = () => {
    setGameResults("");
    setName("");
  };

  return (
    <>
      <header>N-Back challange</header>

      <section>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            minLength={5}
            required
          ></input>
          <button type="submit">submit</button>
        </form>
        {gameStarted && name && (
          <>
            <div> the same is started</div>
            <Game nBack={name} handleGameOver={handleGameOver} />
          </>
        )}
        {getReady && <GetReady handleGameReady={handleGameReady} />}
        {!gameStarted && gameResults && (
          <>
            <div>{gameResults}</div>
            <button onClick={handleReset}>Reset</button>
          </>
        )}
      </section>
    </>
  );
}

export default App;
