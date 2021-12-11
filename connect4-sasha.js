class Game {
    constructor(height, width, p1, p2) {
        this.players = [p1, p2];
        this.currPlayer = p1;
        this.board = [];
        this.htmlBoard = document.getElementById('board');
        this.HEIGHT = height;
        this.WIDTH = width;
        this.gameOver = false;
    };

    startGame() {
        const startBtn = document.getElementById('start-game');
        startBtn.innerText = 'START GAME';
        startBtn.style.backgroundColor = '#f2b705'
        this.currPlayer = this.players[0];
        this.board = [];
        this.htmlBoard.innerHTML = '';
        this.gameOver = false;
        this.makeHtmlBoard();
        this.makeBoard();
    }

    makeBoard() {
        for (let y = 0; y < this.HEIGHT; y++) {
            this.board.push(Array.from({ length: this.WIDTH }));
        }
        
    }
    makeHtmlBoard() {        
        // make column tops 
        const top = document.createElement('tr');
        top.setAttribute('id', 'column-top');
        this.handleGameClick = this.handleClick.bind(this);
        top.addEventListener('click', this.handleGameClick);

        for (let x = 0; x < this.WIDTH; x++) {
            const headCell = document.createElement('td');
            headCell.setAttribute('id', x);
            top.append(headCell);
        }
        board.append(top);

        // make main part of board
        for (let y = 0; y < this.HEIGHT; y++) {
            const row = document.createElement('tr');

            for (let x = 0; x < this.WIDTH; x++) {
                const cell = document.createElement('td');
                cell.setAttribute('id', `${y}-${x}`);
                row.append(cell);
            }
            board.append(row);
        }
    }
    
    findSpotForCol(x) {
        for (let y = this.HEIGHT - 1; y >= 0; y--) {
            if (!this.board[y][x]) {
                return y;
            }
        }
        return null;    
    }
    

    placeInTable(y, x) {
        const piece = document.createElement('div');
        
        piece.classList.add('piece');
        // piece.classList.add(`p${this.currPlayer}`);
        piece.style.top = -50 * (y + 2);
        piece.style.backgroundColor = this.currPlayer.color;

        const spot = document.getElementById(`${y}-${x}`);
        spot.append(piece);
    }

    endGame(msg) {
        const startBtn = document.getElementById('start-game')
        alert(msg);
        const top = document.querySelector('#column-top');
        top.removeEventListener('click', this.handleGameClick);
        startBtn.innerText = 'PLAY AGAIN?';
    }

    handleClick(evt) {
        const startBtn = document.getElementById('start-game')
        const x = +evt.target.id;
        const y = this.findSpotForCol(x);
        if (y === null) {
            return;
        }

        this.board[y][x] = this.currPlayer;
        this.placeInTable(y, x);

        if (this.checkForWin()) {
            startBtn.style.backgroundColor = this.currPlayer.color;
            console.log(`WINNER: ${this.currPlayer.color}`);

            setTimeout(() => {startBtn.innerText = 'WINNER!';}, 0);           
            setTimeout(this.endGame, 100,`${this.currPlayer.color} wins!`);
            this.gameOver = true;
        }

        if (this.board.every(row => row.every(cell => cell))) {
            startBtn.innerText = 'TIE!'
            setTimeout(this.endGame, 100, 'TIE!');
            this.gameOver = true;            
        }
        
        // console.log(`just played: ${this.currPlayer.color}`);
        // this.currPlayer = this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
        // startBtn.style.backgroundColor = this.currPlayer.color;
        // startBtn.innerText = `${this.currPlayer.color}'s turn`;
        // console.log(`current player: ${this.currPlayer.color}`);

        if (!this.checkForWin()) {
            this.currPlayer = this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
            startBtn.style.backgroundColor = this.currPlayer.color;
            startBtn.innerText = `${this.currPlayer.color}'s turn`;
        }
    }


    checkForWin() {
        const _win = cells =>
            cells.every(
                ([y, x]) =>
                    y >= 0 &&
                    y < this.HEIGHT &&
                    x >= 0 &&
                    x < this.WIDTH &&
                    this.board[y][x] === this.currPlayer
            );
        for (let y = 0; y < this.HEIGHT; y++) {
            for (let x = 0; x < this.WIDTH; x++) {
                // get "check list" of 4 cells (starting here) for each of the different
                // ways to win
                const horiz = [
                    [y, x],
                    [y, x + 1],
                    [y, x + 2],
                    [y, x + 3]];
                
                const vert = [
                    [y, x],
                    [y + 1, x],
                    [y + 2, x],
                    [y + 3, x]];
                
                const diagDR = [
                    [y, x],
                    [y + 1, x + 1],
                    [y + 2, x + 2],
                    [y + 3, x + 3]];
                
                const diagDL = [
                    [y, x],
                    [y + 1, x - 1],
                    [y + 2, x - 2],
                    [y + 3, x - 3]];
                // find winner (only checking each win-possibility as needed)
                if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                    return true;
                }
            }  
        }
    }
}

class Player {
    constructor(color) {
        this.color = color;
    }
}

let playerForm = document.getElementById('start-form');
playerForm.addEventListener('submit', (e) => {
    let p1 = new Player(document.getElementById('p1-color').value);
    let p2 = new Player(document.getElementById('p2-color').value);
    const connectFour = new Game(6, 7, p1, p2);

    e.preventDefault();
    connectFour.startGame();

});

