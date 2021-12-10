class Game {
    constructor(p1, p2, height = 6, width = 7) {
        this.players = [p1, p2];
        this.HEIGHT = height;
        this.WIDTH = width;
        this.makeHtmlBoard();
        this.makeBoard();
        this.currPlayer = p1;
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
        this.handleGameClick = this.handleClick.bind(this);
        top.addEventListener('click', this.handleGameClick);

        // top.addEventListener('click', this.handleClick.bind(this));

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
        alert(msg);
        const top = document.querySelector('#column-top');
        top.removeEventListener('click', this.handleGameClick);
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

        //Can't get this to call the right winner with the setTimeout
        if (this.checkForWin()) {
            setTimeout(() => { startBtn.innerText = 'WINNER!' },0);

            setTimeout(this.endGame, 500, `${this.currPlayer.color} wins!`);
            setTimeout(() => {
                startBtn.innerText = 'PLAY AGAIN?';
            }, 5000);
            this.gameOver = true;
            // return this.endGame(`${this.currPlayer.color} wins!`);
            
        }

        if (this.board.every(row => row.every(cell => cell))) {
            startBtn.innerText = 'Try Again?!'
            setTimeout(this.endGame, 500, 'TIE!');
            // setTimeout(() => {
            //     startBtn.innerText = 'PLAY AGAIN?';
            // }, 5000);
            this.gameOver = true;
            // return this.endGame('Tie!');
        }

        this.currPlayer = this.currPlayer === this.players[0] ? this.players[1] : this.players[0];

        startBtn.style.backgroundColor = this.currPlayer.color;
        startBtn.innerText = `${this.currPlayer.color}'s turn`;

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


// window.addEventListener("load", e => {
//     document.getElementById("new-game-btn").onclick = function () {
//         location.reload();
//     }
// });


document.getElementById('start-game').addEventListener('click', () => {
    let p1 = new Player(document.getElementById('p1-color').value);
    let p2 = new Player(document.getElementById('p2-color').value);
    new Game(p1, p2);
    
})

