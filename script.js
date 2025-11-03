let topOfRange = null;
let randomNumber = null;
let guesses = 0;

const maxInput = document.getElementById("max-number");
const startBtn = document.getElementById("start-game");
const setupMessage = document.getElementById("setup-message");

const playArea = document.getElementById("play-area");
const rangeDisplay = document.getElementById("range-display");
const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("submit-guess");
const feedback = document.getElementById("feedback");
const guessCount = document.getElementById("guess-count");

// Start game: validate top-of-range and generate random number
startBtn.addEventListener("click", () => {
  const value = maxInput.value.trim();

  if (!value || isNaN(value)) {
    setupMessage.textContent = "Please type a number next time.";
    return;
  }

  topOfRange = parseInt(value, 10);

  if (topOfRange <= 0) {
    setupMessage.textContent = "Please type a number larger than 0 next time.";
    return;
  }

  // Valid input – start the game
  randomNumber = Math.floor(Math.random() * (topOfRange + 1)); // 0 to topOfRange
  guesses = 0;
  setupMessage.textContent = "";
  rangeDisplay.textContent = topOfRange;
  feedback.textContent = "";
  guessCount.textContent = "";
  guessInput.value = "";

  playArea.classList.remove("hidden");
  guessInput.focus();
});

// Handle guesses
guessBtn.addEventListener("click", () => {
  const value = guessInput.value.trim();
  if (!value || isNaN(value)) {
    feedback.textContent = "Please type a number next time.";
    return;
  }

  const userGuess = parseInt(value, 10);
  guesses++;

  if (userGuess === randomNumber) {
    feedback.textContent = "You got it!";
    guessCount.textContent = `You got it in ${guesses} guesses.`;
    // Optional: disable further guesses or reset game
  } else if (userGuess > randomNumber) {
    feedback.textContent = "You were above the number!";
    guessCount.textContent = `Guesses so far: ${guesses}`;
  } else {
    feedback.textContent = "You were below the number!";
    guessCount.textContent = `Guesses so far: ${guesses}`;
  }

  guessInput.value = "";
  guessInput.focus();
});