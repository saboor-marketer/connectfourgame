// Connect Four Game Logic
class ConnectFour {
    constructor() {
        this.rows = 6;
        this.cols = 7;
        this.board = [];
        this.currentPlayer = 1;
        this.gameOver = false;
        this.gameMode = '2players'; // '2players' or 'computer'
        this.player1Color = '#e74c3c';
        this.player2Color = '#f1c40f';
        
        this.init();
    }

    init() {
        this.createBoard();
        this.setupEventListeners();
        this.updatePlayerIndicator();
    }

    createBoard() {
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.innerHTML = '';
        
        // Initialize board array
        this.board = Array(this.rows).fill(null).map(() => Array(this.cols).fill(0));
        
        // Create columns and cells
        for (let col = 0; col < this.cols; col++) {
            const column = document.createElement('div');
            column.className = 'column';
            column.dataset.col = col;
            column.setAttribute('role', 'columnheader');
            column.setAttribute('tabindex', '0');
            column.setAttribute('aria-label', `Column ${col + 1}`);
            
            for (let row = this.rows - 1; row >= 0; row--) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.setAttribute('role', 'gridcell');
                column.appendChild(cell);
            }
            
            gameBoard.appendChild(column);
        }
    }

    setupEventListeners() {
        // Column click events
        const columns = document.querySelectorAll('.column');
        columns.forEach(column => {
            column.addEventListener('click', (e) => this.handleColumnClick(column));
            column.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleColumnClick(column);
                }
            });
        });

        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());

        // Rules button
        document.getElementById('rulesBtn').addEventListener('click', () => this.showRules());
        document.getElementById('closeModal').addEventListener('click', () => this.hideRules());
        document.getElementById('rulesModal').addEventListener('click', (e) => {
            if (e.target.id === 'rulesModal') {
                this.hideRules();
            }
        });

        // Mode button
        document.getElementById('modeBtn').addEventListener('click', () => this.toggleGameMode());

        // Keyboard accessibility for modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideRules();
            }
        });
    }

    handleColumnClick(column) {
        if (this.gameOver) return;
        
        const col = parseInt(column.dataset.col);
        const row = this.getAvailableRow(col);
        
        if (row !== -1) {
            this.makeMove(row, col);
            
            // Check for win or draw
            if (this.checkWin(row, col)) {
                this.endGame(this.currentPlayer);
            } else if (this.checkDraw()) {
                this.endGame('draw');
            } else {
                this.switchPlayer();
                
                // If playing against computer, make computer move
                if (this.gameMode === 'computer' && this.currentPlayer === 2 && !this.gameOver) {
                    setTimeout(() => this.computerMove(), 500);
                }
            }
        }
    }

    getAvailableRow(col) {
        for (let row = 0; row < this.rows; row++) {
            if (this.board[row][col] === 0) {
                return row;
            }
        }
        return -1; // Column is full
    }

    makeMove(row, col) {
        this.board[row][col] = this.currentPlayer;
        
        // Update visual board
        const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        cell.classList.add(this.currentPlayer === 1 ? 'player1' : 'player2');
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        this.updatePlayerIndicator();
    }

    updatePlayerIndicator() {
        const disc = document.getElementById('currentPlayerDisc');
        const name = document.getElementById('currentPlayerName');
        
        disc.style.background = this.currentPlayer === 1 ? this.player1Color : this.player2Color;
        
        if (this.gameMode === 'computer') {
            name.textContent = this.currentPlayer === 1 ? 'Player 1 (Red)' : 'Computer (Yellow)';
        } else {
            name.textContent = this.currentPlayer === 1 ? 'Player 1 (Red)' : 'Player 2 (Yellow)';
        }
    }

    checkWin(row, col) {
        const player = this.board[row][col];
        
        // Check horizontal
        if (this.checkDirection(row, col, 0, 1, player)) return true;
        
        // Check vertical
        if (this.checkDirection(row, col, 1, 0, player)) return true;
        
        // Check diagonal (down-right)
        if (this.checkDirection(row, col, 1, 1, player)) return true;
        
        // Check diagonal (down-left)
        if (this.checkDirection(row, col, 1, -1, player)) return true;
        
        return false;
    }

    checkDirection(row, col, rowDelta, colDelta, player) {
        let count = 1;
        let winningCells = [[row, col]];
        
        // Check in positive direction
        for (let i = 1; i < 4; i++) {
            const newRow = row + rowDelta * i;
            const newCol = col + colDelta * i;
            
            if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols) {
                if (this.board[newRow][newCol] === player) {
                    count++;
                    winningCells.push([newRow, newCol]);
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        
        // Check in negative direction
        for (let i = 1; i < 4; i++) {
            const newRow = row - rowDelta * i;
            const newCol = col - colDelta * i;
            
            if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols) {
                if (this.board[newRow][newCol] === player) {
                    count++;
                    winningCells.push([newRow, newCol]);
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        
        if (count >= 4) {
            this.highlightWinningCells(winningCells);
            return true;
        }
        
        return false;
    }

    highlightWinningCells(cells) {
        cells.forEach(([row, col]) => {
            const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            cell.classList.add('winning');
        });
    }

    checkDraw() {
        // Check if all cells in the top row are filled
        for (let col = 0; col < this.cols; col++) {
            if (this.board[this.rows - 1][col] === 0) {
                return false;
            }
        }
        return true;
    }

    endGame(result) {
        this.gameOver = true;
        const status = document.getElementById('gameStatus');
        
        if (result === 'draw') {
            status.textContent = "It's a draw!";
            status.className = 'game-status draw';
        } else {
            const winnerName = this.gameMode === 'computer' 
                ? (result === 1 ? 'Player 1' : 'Computer')
                : `Player ${result}`;
            status.textContent = `${winnerName} wins!`;
            status.className = 'game-status winner';
        }
    }

    resetGame() {
        this.board = Array(this.rows).fill(null).map(() => Array(this.cols).fill(0));
        this.currentPlayer = 1;
        this.gameOver = false;
        
        // Clear visual board
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.classList.remove('player1', 'player2', 'winning');
        });
        
        // Clear status
        const status = document.getElementById('gameStatus');
        status.textContent = '';
        status.className = 'game-status';
        
        this.updatePlayerIndicator();
    }

    showRules() {
        const modal = document.getElementById('rulesModal');
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.getElementById('closeModal').focus();
    }

    hideRules() {
        const modal = document.getElementById('rulesModal');
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }

    toggleGameMode() {
        const modeBtn = document.getElementById('modeBtn');
        
        if (this.gameMode === '2players') {
            this.gameMode = 'computer';
            modeBtn.textContent = 'Mode: vs Computer';
        } else {
            this.gameMode = '2players';
            modeBtn.textContent = 'Mode: 2 Players';
        }
        
        this.resetGame();
    }

    computerMove() {
        if (this.gameOver) return;
        
        // Simple AI: Try to win, block opponent, or pick random column
        const col = this.getBestMove();
        
        if (col !== -1) {
            const row = this.getAvailableRow(col);
            if (row !== -1) {
                this.makeMove(row, col);
                
                if (this.checkWin(row, col)) {
                    this.endGame(2);
                } else if (this.checkDraw()) {
                    this.endGame('draw');
                } else {
                    this.switchPlayer();
                }
            }
        }
    }

    getBestMove() {
        // First, try to find a winning move
        for (let col = 0; col < this.cols; col++) {
            const row = this.getAvailableRow(col);
            if (row !== -1) {
                this.board[row][col] = 2;
                if (this.checkWin(row, col)) {
                    this.board[row][col] = 0;
                    return col;
                }
                this.board[row][col] = 0;
            }
        }
        
        // Second, try to block opponent's winning move
        for (let col = 0; col < this.cols; col++) {
            const row = this.getAvailableRow(col);
            if (row !== -1) {
                this.board[row][col] = 1;
                if (this.checkWin(row, col)) {
                    this.board[row][col] = 0;
                    return col;
                }
                this.board[row][col] = 0;
            }
        }
        
        // Third, prefer center column
        const centerCol = 3;
        if (this.getAvailableRow(centerCol) !== -1) {
            return centerCol;
        }
        
        // Finally, pick a random available column
        const availableCols = [];
        for (let col = 0; col < this.cols; col++) {
            if (this.getAvailableRow(col) !== -1) {
                availableCols.push(col);
            }
        }
        
        if (availableCols.length > 0) {
            return availableCols[Math.floor(Math.random() * availableCols.length)];
        }
        
        return -1;
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ConnectFour();
});
