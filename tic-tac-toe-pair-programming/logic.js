const boardElement = document.querySelector('#board');
const startButton = document.querySelector('#start');
const resetButton = document.querySelector('#reset');
const nextRoundButton = document.querySelector('#nextRound');
const cellElements = boardElement.querySelectorAll('div');


const state = {
  cellValues: ['', '', '', '', '', '', '', '', ''],
  firstPlayerPlayed: 'X',
  playerTurn: 'X',
  lastPlayerPlayed: '',
  gameIsActive: false,
  score: {
    X: 0,
    O: 0
  },

  increaseWinnerScore: function() {
    this.score[this.lastPlayerPlayed] += 1;
  },

  reset: function() {
    this.playerTurn = this.firstPlayerPlayed;
    this.cellValues = ['', '', '', '', '', '', '', '', ''];
    this.gameIsActive = false;
  },

  goToNextRound: function() {
    this.firstPlayerPlayed = this.firstPlayerPlayed === 'X' ? 'O' : 'X';
    this.playerTurn = this.firstPlayerPlayed;
    this.cellValues = ['', '', '', '', '', '', '', '', ''];
    this.gameIsActive = false;
  },

  setNextPlayer: function() {
    this.lastPlayerPlayed = this.playerTurn;
    this.playerTurn = this.playerTurn === 'X' ? 'O' : 'X';

    return this.playerTurn;
  },

  setCellValue: function(index) {
    this.cellValues[index] = this.playerTurn;

    return this.cellValues;
  },

  setGameIsActive: function(value) {
    this.gameIsActive = value;

    return this.gameIsActive;
  }
};

const hideElement = (element) => {
  element.classList.add('d-none');
}

const showElement = (element) => {
  element.classList.remove('d-none');
}


const resetGame = () => {
  state.reset();
  boardElement.classList.add('active');
  showElement(startButton);
  hideElement(resetButton);

  boardElement
  .querySelectorAll('div')
  .forEach(cell => cell.textContent = '');
}

const setCellValue = (index) => {
  document.querySelector(`#cell_${index}`).textContent =  state.playerTurn;
  state.setCellValue(index);
  state.setNextPlayer();
  checkForWinner();
}

const startGame = () => {
  state.setGameIsActive(true);
  boardElement.classList.add('active');
  hideElement(startButton);
  showElement(resetButton);
}

const checkForWinner = () => {
  const [c1, c2, c3, c4, c5, c6, c7, c8, c9] = state.cellValues;
  const winningCombination = state.lastPlayerPlayed + state.lastPlayerPlayed + state.lastPlayerPlayed

  if (
    [c1,c2,c3].join('') ===  winningCombination ||
    [c4,c5,c6].join('') ===  winningCombination ||
    [c7,c8,c9].join('') ===  winningCombination ||
    [c1,c4,c7].join('') ===  winningCombination ||
    [c2,c5,c8].join('') ===  winningCombination ||
    [c3,c6,c9].join('') ===  winningCombination ||
    [c1,c5,c9].join('') ===  winningCombination ||
    [c3,c5,c7].join('') ===  winningCombination
  ) {
    state.increaseWinnerScore();
    hideElement(resetButton);
    showElement(nextRoundButton);
    boardElement.classList.remove('active');
    return;
  }

  if (state.cellValues.filter(Boolean).length === 0) {
    hideElement(nextRoundButton);
    boardElement.classList.remove('active');
  }
}

const goToNextRound = () => {
  cellElements.forEach((cell) => cell.textContent = '');
  hideElement(nextRoundButton);
  showElement(startButton);
  state.goToNextRound();
}

cellElements.forEach((cell, index) => cell.addEventListener('click', () => setCellValue(index)));

startButton.addEventListener('click', startGame);

resetButton.addEventListener('click', resetGame);

nextRoundButton.addEventListener('click', goToNextRound);

