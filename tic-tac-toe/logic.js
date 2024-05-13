const boardCells = document.querySelectorAll(".cell");
const CELL_SHADOW = "1px solid rgb(117, 117, 117)";

function PlayerFactory(name, id, score) {
  const symbol = id === 1 ? "X" : "O";
  return { name, symbol, score };
}

const game = (() => {
  const gameLog = {
    0: {
      markedBy: "",
      winningCombinations: [
        [1, 2],
        [4, 6],
        [4, 8],
      ],
    },
    1: {
      markedBy: "",
      winningCombinations: [
        [0, 2],
        [5, 7],
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
        [2, 4],
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

  let currentPlayer;
  let player1;
  let player2;

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
    console.log(gameLog);
  };

  const checkForWinner = () => {
    for (const info of Object.values(gameLog)) {
      const winningCombinations = info.winningCombinations;
      if (info.markedBy === currentPlayer.symbol) {
        for (const combination of winningCombinations) {
          if (
            combination.every(
              (pos) => gameLog[pos].markedBy === currentPlayer.symbol
            )
          ) {
            console.log(true);
          }
        }
      }
    }
  };

  const initializePlayers = (name1, name2) => {
    player1 = PlayerFactory(name1, 1, 0);
    player2 = PlayerFactory(name2, 2, 0);
    currentPlayer = Math.floor(Math.random() * 2) === 1 ? player1 : player2;
  };

  const swapPlayer = () => {
    currentPlayer = currentPlayer.symbol === player1.symbol ? player2 : player1;
  };

  const playRound = (e, index) => {
    markCell(e, index);
    checkForWinner();
    swapPlayer();
  };

  return { setCellBorders, playRound, initializePlayers };
})();

boardCells.forEach((cell, index) => {
  cell.addEventListener("click", (e) => game.playRound(e, index));
});

game.initializePlayers("p1", "p2");
game.setCellBorders();
