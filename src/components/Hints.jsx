import React from "react";

export const Hints = ({ hintsUsed, handleHint }) => {
  return (
    <div className="mt-4">
      <div>Hints Used: {hintsUsed}</div>
      <button
        onClick={handleHint}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Request Hint
      </button>
    </div>
  );
};
