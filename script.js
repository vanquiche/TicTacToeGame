// GLOBAL SCOPE VARIABLES
let board = ['', '', '', '', '', '', '', '', ''];
let playerMark = '';

// FACTORY FUNCTION FOR PLAYER
const player = (name, mark) => {
  // private
  let turn = false;
  let score = 0;
  function getInfo() {
    return { name, mark, turn };
  }
  function getMark() {
    return mark;
  }
  function getTurn() {
    return turn;
  }
  function setTurn(state) {
    return (turn = state);
  }
  function setScore(num) {
    score += num;
  }
  function getScore() {
    return 'score: ' + score;
  }
  return {
    //public
    getInfo,
    getMark,
    getTurn,
    getScore,
    setTurn,
    setScore,
  };
};
const p1 = player('Player One', 'X');
const p2 = player('Player Two', 'O');


// GAME CONTROLLER MODULE
const controller = (() => {
  // variables
  const startBtn = document.getElementById('startGameBtn');
  const restartBtn = document.getElementById('restartGameBtn');
  const p1Container = document.getElementById('playerOneContainer');
  const p2Container = document.getElementById('playerTwoContainer');
  const noticeSign = document.getElementById('noticeContainer');
  const message = document.getElementById('message');
  const block = document.getElementById('blockCover');
  const p1Score = document.getElementById('p1ScoreTxt');
  const p2Score = document.getElementById('p2ScoreTxt');
  let counter = 0;

  // event listeners
  // start button
  startBtn.addEventListener('click', () => {
    clearBoard();
    startGame();
    noticeSign.classList.add('shrink');
    block.classList.add('hide');
  });
  // restart button
  restartBtn.addEventListener('click', () => {
    clearBoard();
    startGame();
    noticeSign.classList.add('shrink');
  });
  window.addEventListener('load', () => {
    noticeSign.classList.remove('shrink');
    message.innerText = 'Start a New Match!';
    block.classList.remove('hide');
  });

  function startGame() {
    let playerTurn = Math.round(Math.random() * 1);
    switch (playerTurn) {
      case 0:
        p1.setTurn(true);
        playerMark = 'X';
        p1Container.classList.add('blue');
        break;
      case 1:
        p2.setTurn(true);
        playerMark = 'O';
        p2Container.classList.add('blue');
        break;
    }
    // update score
    p1Score.innerText = `${p1.getScore()}`;
    p2Score.innerText = `${p2.getScore()}`;
  }
  function clearBoard() {
    for (let i = 0; i < board.length; i++) {
      let id = i;
      document.getElementById(id).innerText = '';
      document.getElementById(id).classList.remove('highlight');
      board[i] = '';
    }
    p1.setTurn(false);
    p2.setTurn(false);
    switchTurn('');
    counter = 0;
  }

  function switchTurn(mark) {
    switch (mark) {
      case 'X':
        p2.setTurn(true);
        p1.setTurn(false);
        playerMark = 'O';
        p2Container.classList.add('blue');
        p1Container.classList.remove('blue');
        checkWin('X');
        break;
      case 'O':
        p2.setTurn(false);
        p1.setTurn(true);
        playerMark = 'X';
        p1Container.classList.add('blue');
        p2Container.classList.remove('blue');
        checkWin('O');
        break;
      case '':
        playerMark = '';
        p1Container.classList.remove('blue');
        p2Container.classList.remove('blue');
    }
  }
  function checkWin(mark) {
    let win = null;
    counter += 1;
    let position = [];
    let player;
    let squares;
    const conditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    // find position of mark on board
    for (let i = 0; i < board.length; i++) {
      if (board[i] === mark) {
        position.push(i);
      }
      // compare against winning conditions
      for (let j = 0; j < conditions.length; j++) {
        if (conditions[j].every((item) => position.includes(item)) === true) {
          win = true;
          squares = conditions.slice(j, j + 1).flat();
        }
      }
    }
    mark === 'X' ? player = 'Player One' : player = 'Player Two';
    if (win === true) {
      mark === 'X' ? p1.setScore(1) : p2.setScore(1);
      winningSquares(squares);
      noticeSign.classList.remove('shrink');
      block.classList.remove('hide');
      message.innerText = player + ' wins! \n Play again?';
    }
    if (counter === 9 && win === null) {
      noticeSign.classList.remove('shrink');
      block.classList.remove('hide');
      message.innerText = `Cat's game. Meow! \n Play again?`;
    }
  }
  function winningSquares(arr) {
    console.log(arr)
    for (let i = 0; i < arr.length; i++) {
      document.getElementById(arr[i]).classList.add('highlight');
    }
  }
  return {
    switchTurn,
  };
})();

// GAME BOARD MODULE
const gameBoard = (() => {
  const boardContainer = document.getElementById('gameBoard');
  function createBoard() {
    for (let i = 0; i < board.length; i++) {
      const square = document.createElement('div');
      square.classList = 'square';
      square.id = i;
      boardContainer.appendChild(square);
      // event listener
      // board squares
      square.addEventListener('click', () => {
        if (square.innerText != '') return;
        board[square.id] = playerMark;
        square.innerText = `${board[square.id]}`;
        controller.switchTurn(playerMark);
      });
    }
  }

  createBoard();
})();
