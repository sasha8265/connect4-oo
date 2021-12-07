class Game {
    constructor(height,width) {
        this.HEIGHT = height;
        this.WIDTH = width;
        let currPlayer = 1;
        let board = [];
        this.makeHtmlBoard();
        this.makeBoard();
    };

    makeBoard() {
        for (let y = 0; y < this.HEIGHT; y++) {
            this.board.push(Array.from({ length: WIDTH }));
        }
        
    }
    makeHtmlBoard() {
        const board = document.getElementById('board');
        
        // make column tops 
        const top = document.createElement('tr');
        top.setAttribute('id', 'column-top');
        // top.addEventListener('click', handleClick);

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


}

let newGame = new Game(6, 7);