export const saveGameState = (gameState) => {
  localStorage.setItem("gameState", JSON.stringify(gameState));
};

export const loadGameState = () => {
  const savedState = localStorage.getItem("gameState");
  return savedState ? JSON.parse(savedState) : null;
};

export const resetGameState = () => {
  localStorage.removeItem("gameState");
};
