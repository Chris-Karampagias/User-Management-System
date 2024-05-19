const app = (() => {
  const firstPlayerScore = document.getElementById("player1");
  const secondPlayerScore = document.getElementById("player2");
  const result = document.querySelector(".result");
  const boardCells = document.querySelectorAll(".cell");
  const buttonContainer = document.querySelector(".buttons-container");
  const restartButton = document.getElementById("restart");
  const clearButton = document.getElementById("clear");
  const startButton = document.getElementById("start");
  const inputsForm = document.getElementById("inputs");
  const CELL_SHADOW = "1px solid rgb(117, 117, 117)";
  const ORANGE = "rgb(247, 74, 5)";
  const BLUE = "rgb(43, 159, 237)";
  const NAME_ANIMATION = "0.3s infinite alternate pop";

  function PlayerFactory(name, id) {
    const symbol = id === 1 ? "X" : "O";
    return { name, symbol, score: 0 };
  }

  let currentPlayer;
  let player1;
  let player2;

  const gameLog = {
    0: {
      markedBy: "",
      winningCombinations: [
        [1, 2],
        [3, 6],
        [4, 8],
      ],
    },
    1: {
      markedBy: "",
      winningCombinations: [
        [0, 2],
        [4, 7],
      ],
    },
    2: {
      markedBy: "",
      winningCombinations: [
        [0, 1],
        [4, 6],
        [5, 8],
      ],
    },
    3: {
      markedBy: "",
      winningCombinations: [
        [0, 6],
        [4, 5],
      ],
    },
    4: {
      markedBy: "",
      winningCombinations: [
        [1, 7],
        [3, 5],
        [0, 8],
        [2, 6],
      ],
    },
    5: {
      markedBy: "",
      winningCombinations: [
        [3, 4],
        [2, 8],
      ],
    },
    6: {
      markedBy: "",
      winningCombinations: [
        [0, 3],
        [2, 4],
        [7, 8],
      ],
    },
    7: {
      markedBy: "",
      winningCombinations: [
        [6, 8],
        [1, 4],
      ],
    },
    8: {
      markedBy: "",
      winningCombinations: [
        [6, 7],
        [0, 4],
        [2, 5],
      ],
    },
  };

  const setCellBorders = () => {
    boardCells.forEach((cell, index) => {
      if ([0, 1, 2].includes(index)) {
        cell.style.borderBottom = CELL_SHADOW;
      } else if ([6, 7, 8].includes(index)) {
        cell.style.borderTop = CELL_SHADOW;
      }

      if ([1, 4, 7].includes(index)) {
        cell.style.borderLeft = CELL_SHADOW;
        cell.style.borderRight = CELL_SHADOW;
      }
    });
  };

  const markCell = (e, position) => {
    gameLog[position].markedBy = currentPlayer.symbol;
    e.target.firstElementChild.textContent = currentPlayer.symbol;
    e.target.style.pointerEvents = "none";
  };

  const findWinner = () => {
    // False code 1 means no winner was found and all cells have been marked
    // False code 2 means no winner was found and not all cells have been marked yet

    for (const info of Object.values(gameLog)) {
      const winningCombinations = info.winningCombinations;
      if (info.markedBy === currentPlayer.symbol) {
        for (const combination of winningCombinations) {
          if (
            combination.every(
              (pos) => gameLog[pos].markedBy === currentPlayer.symbol
            )
          ) {
            return [true, currentPlayer];
          }
        }
      }
    }

    if (Object.keys(gameLog).every((pos) => gameLog[pos].markedBy)) {
      return [false, 1];
    }

    return [false, 2];
  };

  const initializePlayers = (name1, name2) => {
    player1 = PlayerFactory(name1, 1);
    player2 = PlayerFactory(name2, 2);
    currentPlayer = Math.floor(Math.random() + 1) === 1 ? player1 : player2;
  };

  const swapPlayer = () => {
    currentPlayer = currentPlayer.symbol === player1.symbol ? player2 : player1;
  };

  const refreshGameLog = () => {
    for (const pos of Object.keys(gameLog)) {
      gameLog[pos].markedBy = "";
    }
  };

  const enableCells = () => {
    boardCells.forEach((cell) => {
      cell.style.pointerEvents = "auto";
    });
  };

  const removeNextPlayerNotification = () => {
    firstPlayerScore.style.removeProperty("animation");
    secondPlayerScore.style.removeProperty("animation");
  };

  const notifyNextPlayer = () => {
    if (currentPlayer.symbol === "X") {
      secondPlayerScore.style.removeProperty("animation");
      firstPlayerScore.style.animation = NAME_ANIMATION;
      return;
    }
    firstPlayerScore.style.removeProperty("animation");
    secondPlayerScore.style.animation = NAME_ANIMATION;
  };

  const displayResult = (payload) => {
    if (typeof payload === "number") {
      result.textContent = "It's a draw!";
      return;
    }

    result.textContent = `${payload.name} wins!`;
    result.style.color = payload.symbol === "X" ? ORANGE : BLUE;
  };

  const clearResult = () => {
    result.textContent = "";
    result.style.color = "black";
  };

  const disableCells = () => {
    boardCells.forEach((cell) => {
      cell.style.pointerEvents = "none";
    });
  };

  const restoreCells = () => {
    boardCells.forEach((cell) => {
      cell.firstElementChild.textContent = "";
      cell.style.pointerEvents = "auto";
    });
  };

  const clearInputs = () => {
    inputsForm.name1.value = "";
    inputsForm.name2.value = "";
  };

  const resetPlayers = () => {
    currentPlayer = null;
    player1 = null;
    player2 = null;
  };

  const toggleClearButtonDisplay = () => {
    const currentDisplay = window.getComputedStyle(clearButton, null).display;
    clearButton.style.display = currentDisplay === "block" ? "none" : "block";
  };

  const clearPlayerScores = (score1, score2) => {
    clearPlayerScore(score1);
    clearPlayerScore(score2);
  };

  const clearPlayerScore = (element) => {
    const parts = element.textContent.split(":");
    const newScore = 0;
    parts[1] = newScore;
    const newTextContent = parts.join(": ");
    element.textContent = newTextContent;
  };

  const updateScore = () => {
    if (currentPlayer.symbol === "X") {
      updatePlayerScoreTextContent(firstPlayerScore);
      return;
    }
    updatePlayerScoreTextContent(secondPlayerScore);
  };

  const toggleInputReadonly = () => {
    const isReadonly = !!inputsForm.name1.getAttribute("readonly");
    if (isReadonly) {
      inputsForm.name1.removeAttribute("readonly");
      inputsForm.name2.removeAttribute("readonly");
      return;
    }
    inputsForm.name1.setAttribute("readonly", "true");
    inputsForm.name2.setAttribute("readonly", "true");
  };

  const updatePlayerScoreTextContent = (element) => {
    const parts = element.textContent.split(":");
    const newScore = currentPlayer.score;
    parts[1] = newScore;

    const newTextContent = parts.join(": ");
    element.textContent = newTextContent;
  };

  const toggleStartButtonDisplay = () => {
    const currentDisplay = window.getComputedStyle(startButton, null).display;
    startButton.style.display = currentDisplay === "block" ? "none" : "block";
  };

  const toggleRestartButtonDisplay = () => {
    const currentDisplay = window.getComputedStyle(restartButton, null).display;
    restartButton.style.display = currentDisplay === "block" ? "none" : "block";
  };

  const toggleInputsAndStartButton = () => {
    toggleInputReadonly();
    toggleStartButtonDisplay();
  };

  const validateInputValues = () => {
    const firstName = inputsForm.name1;
    const secondName = inputsForm.name2;
    const firstNameValidity = firstName.validity;
    const secondNameValidity = secondName.validity;

    if (firstNameValidity.valueMissing) {
      firstName.setCustomValidity("Field is required");
    } else {
      firstName.setCustomValidity("");
    }

    if (secondNameValidity.valueMissing) {
      secondName.setCustomValidity("Field is required");
    } else {
      secondName.setCustomValidity("");
    }

    const secondNameIsValid = secondName.reportValidity();
    const firstNameIsValid = firstName.reportValidity();

    return firstNameIsValid && secondNameIsValid;
  };

  // Core Functions
  const playRound = (e, index) => {
    markCell(e, index);
    const [winnerFound, payload] = findWinner();
    if (winnerFound) {
      payload.score++;
      updateScore();
    }

    if (winnerFound || payload === 1) {
      disableCells();
      toggleRestartButtonDisplay();
      toggleClearButtonDisplay();
      removeNextPlayerNotification();
      displayResult(payload);
    }

    swapPlayer();
    if (!winnerFound && payload !== 1) {
      notifyNextPlayer();
    }
  };

  const reset = () => {
    refreshGameLog();
    restoreCells();
    clearPlayerScores(firstPlayerScore, secondPlayerScore);
    toggleRestartButtonDisplay();
    toggleClearButtonDisplay();
    toggleInputsAndStartButton();
    resetPlayers();
    disableCells();
    clearInputs();
    clearResult();
  };

  const restart = () => {
    refreshGameLog();
    restoreCells();
    toggleRestartButtonDisplay();
    toggleClearButtonDisplay();
    clearResult();
    notifyNextPlayer();
  };

  const start = (e) => {
    e.preventDefault();

    const name1 = e.target.name1.value;
    const name2 = e.target.name2.value;
    const formIsValid = validateInputValues();
    if (formIsValid) {
      initializePlayers(name1, name2);
      toggleInputsAndStartButton();
      enableCells();
      notifyNextPlayer();
    }
  };

  boardCells.forEach((cell, index) => {
    cell.addEventListener("click", (e) => playRound(e, index));
  });

  restartButton.addEventListener("click", restart);

  clearButton.addEventListener("click", reset);

  inputsForm.addEventListener("submit", (e) => start(e));

  const init = () => {
    setCellBorders();
    disableCells();
  };

  return {
    playRound,
    restart,
    reset,
    start,
    init,
  };
})();

app.init();
