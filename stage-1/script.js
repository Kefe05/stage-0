const allBtn = document.querySelectorAll("button");
const colors = ["red", "blue", "orange", "yellow", "green", "purple"];
let previousIndex = null;
let userAllowedInput = 3;
let score = 0;
let gamesPlayed = 0;

// Get modal elements
const welcomeModal = document.getElementById("welcomeModal");
const startGameBtn = document.getElementById("startGame");
const roundInput = document.getElementById("roundInput");
const chatIcon = document.getElementById("chatIcon");

// Scoreboard
const scoreDisplay = document.getElementById("score");
const gamesPlayedDisplay = document.getElementById("gamesPlayed");

// Click tracking
const clickCounts = new Map();

// Show Welcome Modal
welcomeModal.style.display = "flex";

// Start Game
startGameBtn.addEventListener("click", () => {
  userAllowedInput = parseInt(roundInput.value, 10) || 3;
  welcomeModal.style.display = "none"; 
  resetGame();
});

// Show instructions when clicking chat icon
chatIcon.addEventListener("click", () => {
  welcomeModal.style.display = "flex";
});

// Assign button colors and reset data
function resetGame() {
  clickCounts.clear();
  allBtn.forEach((btn, i) => {
    btn.style.backgroundColor = colors[i];
    btn.dataset.id = "colorOption";
    clickCounts.set(btn, 0);
  });
  previousIndex = null;
}

// Check if button is the correct one
function setRandom(btn) {
  if (btn.dataset.id === "Booyah!!!") {
    score++;
    console.log("Correct!", btn);
  } else {
    console.log("Wrong button!", btn);
  }
  updateScoreboard();
}

// Handle button clicks
function handleClick(event) {
  const btn = event.target;
  
  // Update click count for this button
  clickCounts.set(btn, clickCounts.get(btn) + 1);
  console.log(`Button clicked ${clickCounts.get(btn)} times`);

  if (clickCounts.get(btn) > userAllowedInput) {
    btn.removeEventListener("click", handleClick);
    console.log("Button disabled:", btn);
    return;
  }

  // Reset previous "Booyah!!!"
  if (previousIndex !== null) {
    allBtn[previousIndex].dataset.id = "colorOption";
  }

  // Assign "Booyah!!!" to a new random button
  const randomIndex = Math.floor(Math.random() * allBtn.length);
  allBtn[randomIndex].dataset.id = "Booyah!!!";
  previousIndex = randomIndex;

  console.log("Random index:", randomIndex);
  setRandom(btn);
}

// Attach event listeners
allBtn.forEach((btn) => {
  btn.addEventListener("click", handleClick);
});

// Update Scoreboard
function updateScoreboard() {
  scoreDisplay.textContent = score;
  gamesPlayedDisplay.textContent = gamesPlayed;
}
