class Game {
    constructor(height,width) {
        this.HEIGHT = height;
        this.WIDTH = width;
        let currPlayer = 1;
        let board = [];
    };

    makeBoard() {
        for (let y = 0; y < HEIGHT; y++) {
            board.push(Array.from({ length: WIDTH }));
        }
        this.makeBoard();
    }
    makeHtmlBoard() {
        const board = document.getElementById('board');
        
        // make column tops 
        const top = document.createElementNS('tr');
        top.setAttribute('id', 'column-top');
        top.addEventListener('click', handleClick);

        for (let x = 0; x < WIDTH; x++) {
            const headCell = document.createElement('td');
            headCell.setAttribute('id', x);
            top.append(headCell);
        }
        board.append(top);


        // make main part of board
        for (let y = 0; y < HEIGHT; y++) {
            const row = document.createElement('tr');

            for (let x = 0; x < WIDTH; x++) {
                const cell = document.createElement('td');
                cell.setAttribute('id', `${y}-${x}`);
                row.append(cell);
            }
            board.append(row);
        }
        this.makeHtmlBoard();
    }


}

let newGame = new Game(6, 7);