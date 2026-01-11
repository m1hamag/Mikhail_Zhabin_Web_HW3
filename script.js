const board = document.getElementById('board');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameActive = true;

const winCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function createBoard() {
    board.innerHTML = '';
    gameState.forEach((cell, index) => {
        const div = document.createElement('div');
        div.classList.add('cell');
        div.dataset.index = index;
        div.addEventListener('click', handleClick);
        board.appendChild(div);
    });
}

function handleClick(event) {
    const index = event.target.dataset.index;

    if (!gameActive || gameState[index]) {
        return;
    }

    gameState[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add('taken');

    checkResult();
}

function checkResult() {
    let win = false;

    for (let combo of winCombinations) {
        const [a, b, c] = combo;
        if (
            gameState[a] &&
            gameState[a] === gameState[b] &&
            gameState[a] === gameState[c]
        ) {
            win = true;
            break;
        }
    }

    if (win) {
        statusText.textContent = `Победил игрок: ${currentPlayer}`;
        gameActive = false;
        return;
    }

    if (!gameState.includes(null)) {
        statusText.textContent = 'Ничья!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Ходит игрок: ${currentPlayer}`;
}


resetButton.addEventListener('click', () => {
    currentPlayer = 'X';
    gameState = Array(9).fill(null);
    gameActive = true;
    statusText.textContent = 'Ходит игрок: X';
    createBoard();
});

createBoard();
