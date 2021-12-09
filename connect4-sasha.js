class Game {
    constructor(p1, p2, height, width) {
        this.players = [p1, p2];
        this.HEIGHT = height;
        this.WIDTH = width;
        this.makeHtmlBoard();
        this.makeBoard();
        this.currPlayer = 1;
        this.gameOver = false;
    };

    makeBoard() {
        this.board = [];
        for (let y = 0; y < this.HEIGHT; y++) {
            this.board.push(Array.from({ length: this.WIDTH }));
        }
        
    }
    makeHtmlBoard() {
        const board = document.getElementById('board');
        
        // make column tops 
        const top = document.createElement('tr');
        top.setAttribute('id', 'column-top');
        top.addEventListener('click', this.handleClick.bind(this));

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
        piece.classList.add(`p${this.currPlayer}`);
        piece.style.top = -50 * (y + 2);

        const spot = document.getElementById(`${y}-${x}`);
        spot.append(piece);
    }

    endGame(msg) {
        alert(msg);
    }

    handleClick(evt) {
        const x = +evt.target.id;
        const y = this.findSpotForCol(x);
        if (y === null) {
            return;
        }

        this.board[y][x] = this.currPlayer;
        this.placeInTable(y, x);

        //Can't get this to call the right winner with the setTimeout
        if (this.checkForWin()) {
            // setTimeout(() => { this.endGame(`Player ${this.currPlayer} won!`) }, 100);
            return this.endGame(`Player ${this.currPlayer} won!`);
        }

        if (this.board.every(row => row.every(cell => cell))) {
            return this.endGame('Tie!');
        }

        this.currPlayer = this.currPlayer === 1 ? 2 : 1;
        console.log(this);

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


let newGame = new Game(6, 7);

window.addEventListener("load", e => {
    document.getElementById("new-game-btn").onclick = function () {
        location.reload();
    }
});