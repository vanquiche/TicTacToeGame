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
    score = num;
  }
  function getScore() {
    return score;
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

  // event listeners
  // start button
  startBtn.addEventListener('click', () => {
    startGame();
    startBtn.disabled = true;
  });
  // restart button
  restartBtn.addEventListener('click', () => {
    clearBoard();
    startBtn.disabled = false;
  });

  function startGame() {
    let playerTurn = Math.round(Math.random() * 1);
    switch (playerTurn) {
      case 0:
        p1.setTurn(true);
        playerMark = 'X';
        console.log('player one turn');
        p1Container.classList.add('blue');
        break;
      case 1:
        p2.setTurn(true);
        playerMark = 'O';
        console.log('player two turn');
        p2Container.classList.add('blue');
        break;
    }
  }
  function clearBoard() {
    let restart = confirm('restart?');
    if (restart === false) return;
    else if (restart === true) {
      for (let i = 0; i < board.length; i++) {
        let id = i;
        document.getElementById(id).innerText = '';
        board[i] = '';
      }
      p1.setTurn(false);
      p2.setTurn(false);
      switchTurn('');
    }
  }

  function switchTurn(mark) {
    switch (mark) {
      case 'X':
        p2.setTurn(true);
        p1.setTurn(false);
        playerMark = 'O';
        p2Container.classList.add('blue');
        p1Container.classList.remove('blue');
        break;
      case 'O':
        p2.setTurn(false);
        p1.setTurn(true);
        playerMark = 'X';
        p1Container.classList.add('blue');
        p2Container.classList.remove('blue');
        break;
      case '':
        playerMark = '';
        p1Container.classList.remove('blue');
        p2Container.classList.remove('blue');
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
        // checkWin();
      });
    }
  }

  function checkWin() {
    // check board array for specific pattern
    // if either X or O meets the pattern then match is won

    // horizontal
    [0, 1, 2]
    [3, 4, 5]
    [6, 7, 8]
    // vertical
    [0, 3, 6]
    [1, 4, 7]
    [2, 5, 8]
    // diagonal
    [0, 4, 8]
    [6, 4, 2]

  }
  createBoard();
})();
