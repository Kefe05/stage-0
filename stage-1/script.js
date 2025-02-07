
    const colors = ["red", "blue", "green", "yellow", "orange", "purple"];
    const colorBox = document.getElementById("colorBox");
    const buttons = document.querySelectorAll(".color-btn");
    const gameStatus = document.getElementById("gameStatus");
    const scoreDisplay = document.getElementById("score");
    const newGameButton = document.getElementById("newGameButton");
    let score = 0;
    let targetColor = "";
    let previousColor = "";

    function startGame() {
      let newColor;
      do {
        newColor = colors[Math.floor(Math.random() * colors.length)];
      } while (newColor === previousColor);
      previousColor = newColor;
      targetColor = newColor;
      colorBox.style.backgroundColor = targetColor;
      buttons.forEach((button, index) => {
        button.style.backgroundColor = colors[index];
        button.onclick = () => checkGuess(colors[index]);
      });
    }

    function checkGuess(color) {
      if (color === targetColor) {
        gameStatus.textContent = "Correct!";
        score++;
      } else {
        gameStatus.textContent = "Wrong! Try again.";
      }
      scoreDisplay.textContent = score;
    }

    newGameButton.addEventListener("click", startGame);

    startGame();