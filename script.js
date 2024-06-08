const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageTextElement = document.getElementById('winning-message');
const restartButton = document.getElementById('restartButton');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const closeModal = document.getElementById('close');
const X_CLASS = 'x';
const O_CLASS = 'o';
let oTurn;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();

restartButton.addEventListener('click', startGame);
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    startGame();
});

function startGame() {
    oTurn = false;
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    winningMessageTextElement.style.display = 'none';
    winningMessageTextElement.innerText = '';
    modal.style.display = 'none';
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        modalMessage.innerText = 'Draw!';
    } else {
        modalMessage.innerText = `${oTurn ? "O's" : "X's"} Wins!`;
    }
    modal.style.display = 'block';
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    oTurn = !oTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (oTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}
