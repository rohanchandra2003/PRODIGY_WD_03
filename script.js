// Constants for player markers
const PLAYER_X = 'X';
const PLAYER_O = 'O';

// Variables to track game state
let currentPlayer = PLAYER_X;
let board = ['', '', '', '', '', '', '', '', ''];
let gameEnded = false;

// Function to check if there's a winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    if (board.every(cell => cell !== '')) {
        return 'tie';
    }

    return null;
}

// Function to handle a player's move
function makeMove(index) {
    if (gameEnded || board[index] !== '') return;

    board[index] = currentPlayer;
    document.getElementsByClassName('cell')[index].innerText = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        gameEnded = true;
        if (winner === 'tie') {
            setMessage('It\'s a tie!');
        } else {
            setMessage(`Player ${winner} wins!`);
        }
    } else {
        currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
        setMessage(`Player ${currentPlayer}'s turn`);
    }
}

// Function to reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = PLAYER_X;
    gameEnded = false;
    document.getElementById('message').innerText = '';
    Array.from(document.getElementsByClassName('cell')).forEach((cell, index) => {
        cell.innerText = '';
    });
    setMessage(`Player ${currentPlayer}'s turn`);
}

// Function to set a message
function setMessage(message) {
    document.getElementById('message').innerText = message;
}

// Initialize the game
resetGame();
