let topOfRange = null;
let randomNumber = null;
let guesses = 0;
let previousGuesses = [];

const maxInput = document.getElementById("max-number");
const startBtn = document.getElementById("start-game");
const setupMessage = document.getElementById("setup-message");

const playArea = document.getElementById("play-area");
const rangeDisplay = document.getElementById("range-display");
const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("submit-guess");
const playAgainBtn = document.getElementById("play-again");

const feedback = document.getElementById("feedback");
const guessCount = document.getElementById("guess-count");
const hint = document.getElementById("hint");
const previousGuessesEl = document.getElementById("previous-guesses");

// Utility: clear feedback classes
function clearFeedbackClasses() {
  feedback.classList.remove("feedback-correct", "feedback-high", "feedback-low", "feedback-error");
}

// Start / reset game
function startGame() {
  const value = maxInput.value.trim();

  clearFeedbackClasses();
  setupMessage.textContent = "";
  feedback.textContent = "";
  hint.textContent = "";
  previousGuesses = [];
  previousGuessesEl.textContent = "None yet – be the first 😄";

  if (!value || isNaN(value)) {
    setupMessage.textContent = "Please type a number next time.";
    return;
  }

  topOfRange = parseInt(value, 10);

  if (topOfRange <= 0) {
    setupMessage.textContent = "Please type a number larger than 0 next time.";
    return;
  }

  // Generate new random number
  randomNumber = Math.floor(Math.random() * (topOfRange + 1));
  guesses = 0;
  guessCount.textContent = guesses;
  rangeDisplay.textContent = topOfRange;

  playArea.classList.remove("hidden");
  playAgainBtn.classList.add("hidden");

  guessInput.disabled = false;
  guessBtn.disabled = false;
  guessInput.value = "";
  guessInput.focus();
}

// Handle a guess
function handleGuess() {
  const value = guessInput.value.trim();
  clearFeedbackClasses();

  if (!value || isNaN(value)) {
    feedback.textContent = "Please type a number next time.";
    feedback.classList.add("feedback-error");
    return;
  }

  const userGuess = parseInt(value, 10);
  guesses++;
  guessCount.textContent = guesses;

  previousGuesses.push(userGuess);
  previousGuessesEl.textContent = previousGuesses.join(", ");

  if (userGuess === randomNumber) {
    feedback.textContent = "You got it! 🎉";
    feedback.classList.add("feedback-correct");
    hint.textContent = `The number was ${randomNumber}. Great job!`;

    // End round
    guessInput.disabled = true;
    guessBtn.disabled = true;
    playAgainBtn.classList.remove("hidden");
  } else if (userGuess > randomNumber) {
    feedback.textContent = "Too high!";
    feedback.classList.add("feedback-high");
    hint.textContent = "Try a smaller number.";
  } else {
    feedback.textContent = "Too low!";
    feedback.classList.add("feedback-low");
    hint.textContent = "Try a bigger number.";
  }

  guessInput.value = "";
  guessInput.focus();
}

/* Event listeners */

// Start game button
startBtn.addEventListener("click", startGame);

// Guess button
guessBtn.addEventListener("click", handleGuess);

// "Play again" button
playAgainBtn.addEventListener("click", startGame);

// Press Enter to submit a guess when in play area
guessInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !guessBtn.disabled) {
    handleGuess();
  }
});