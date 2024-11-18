import React, { useState, useEffect } from "react";
import { WORDS_AND_HINTS } from "../constants.js";

export const Game = () => {
  const [hiddenWord, setHiddenWord] = useState("");
  const [hints, setHints] = useState([]);
  const [guessesLeft, setGuessesLeft] = useState(5);
  const [score, setScore] = useState(100);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [hintsUsed, setHintsUsed] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState("playing"); // "playing", "won", "lost"
  const [hintsGiven, setHintsGiven] = useState([]);

  // Initialize hidden word and hints
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * WORDS_AND_HINTS.length);
    setHiddenWord(WORDS_AND_HINTS[randomIndex].word);
    setHints(WORDS_AND_HINTS[randomIndex].hints);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (gameStatus === "playing" && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0) setGameStatus("lost");
  }, [timeLeft, gameStatus]);

  // Handle guessing the word
  const handleGuess = () => {
    if (currentGuess.toUpperCase() === hiddenWord) {
      setGameStatus("won");
    } else {
      setGuessesLeft((prev) => prev - 1);
      if (guessesLeft - 1 <= 0) {
        setGameStatus("lost");
      }
    }
    setCurrentGuess(""); // Clear input field
  };

  // Handle requesting a hint
  const handleHint = () => {
    if (hintsUsed < hints.length && score >= 10) {
      setHintsUsed((prev) => prev + 1);
      setHintsGiven((prev) => [...prev, hints[hintsUsed]]);
      setScore((prev) => prev - 10);
      setGuessesLeft((prev) => prev + 1); // Add one extra guess
    }
  };

  // Reset game
  const resetGame = () => {
    window.location.reload(); // Simple page reload to reset the game
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4">Word Guessing Game</h1>
      {gameStatus === "playing" && (
        <>
          <p className="text-lg">
            Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}
          </p>
          <p className="text-lg">Guesses Left: {guessesLeft}</p>
          <p className="text-lg">Score: {score}</p>
          <div className="mt-4">
            <input
              type="text"
              value={currentGuess}
              onChange={(e) => setCurrentGuess(e.target.value)}
              placeholder="Enter your guess"
              className="border p-2 rounded"
            />
            <button
              onClick={handleGuess}
              className="ml-2 bg-blue-500 text-white p-2 rounded"
            >
              Submit Guess
            </button>
          </div>
          <button
            onClick={handleHint}
            className="mt-4 bg-yellow-500 text-white p-2 rounded"
          >
            Request Hint (-10 points)
          </button>
          <div className="mt-4">
            {hintsGiven.map((hint, index) => (
              <p key={index} className="text-green-600">
                Hint {index + 1}: {hint}
              </p>
            ))}
          </div>
        </>
      )}
      {gameStatus === "won" && (
        <div className="text-center">
          <h2 className="text-2xl text-green-500">You Won!</h2>
          <p>The word was: {hiddenWord}</p>
          <button
            onClick={resetGame}
            className="mt-4 bg-red-500 text-white p-2 rounded"
          >
            Play Again
          </button>
        </div>
      )}
      {gameStatus === "lost" && (
        <div className="text-center">
          <h2 className="text-2xl text-red-500">You Lost!</h2>
          <p>The word was: {hiddenWord}</p>
          <button
            onClick={resetGame}
            className="mt-4 bg-red-500 text-white p-2 rounded"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
