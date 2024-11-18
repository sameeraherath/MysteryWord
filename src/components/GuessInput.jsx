import React, { useState } from "react";

export const GuessInput = ({ handleGuess }) => {
  const [guess, setGuess] = useState("");
  // Handle input change
  const handleChange = (e) => {
    setGuess(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleGuess(guess.toUpperCase());
    setGuess(""); // Clear input after guessing
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={guess}
          onChange={handleChange}
          className="p-2 border rounded placeholder='Enter guess'"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Guess
        </button>
      </form>
    </div>
  );
};
