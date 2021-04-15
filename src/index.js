const readLine = require('readline-sync');

// 11 letters for now
const ALPHABET = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K' ];

const PLAYER_1_C = 'X';
const PLAYER_2_C = 'O';
const EMPTY = ' ';

let board = [
    [ EMPTY, EMPTY, EMPTY ],
    [ EMPTY, EMPTY, EMPTY ],
    [ EMPTY, EMPTY, EMPTY ]
];

function visualize_board(b) {
    console.log('   ' + ALPHABET.slice(0, b.length).join('   '));
    for(let i = 0; i < b.length; ++i) {
        console.log(i + '  ' + b[i].join(' | '))
    }
}

function visualize_app(b, p1) {
    visualize_board(b);
    console.log('');
    console.log(p1 ? 'Waiting for player 1 input' : 'Waiting for player 2 input');
    console.log('Please write col and row for ex: A1, B0, C2');
}

function getColRowFromInput(input) {
    if(input.length != 2) {
        throw Error('Input has invalid syntax');
    }

    const col = input[0];
    const row = input[1];

    if(ALPHABET.indexOf(col.toUpperCase()) >= board.length || ALPHABET.indexOf(col.toUpperCase()) == -1) {
        throw Error('Invalid column ' + col);
    }

    try {
        if(Math.abs(parseInt(row)) >= board.length) {
            throw Error('Invalid row ' + row);
        }
    } catch {
        throw Error('Invalid row ' + row);
    }

    return [ ALPHABET.indexOf(col.toUpperCase()), Math.abs(parseInt(row)) ]
}

function checkForWinner(b) {
    // Row check
rowLoop:
    for(row of b) {
        let isP1Winner = row[0] === PLAYER_1_C;
        for(col of row) {
            if(col !== (isP1Winner ? PLAYER_1_C : PLAYER_2_C)) continue rowLoop;
        }
        return true;
    }

    // Col check
colLoop:
    for(let i = 0; i < b.length; ++i) {
        let isP1Winner = b[0][i] === PLAYER_1_C;
        for(row of b) {
            if(row[i] !== (isP1Winner ? PLAYER_1_C : PLAYER_2_C)) continue colLoop;
        }
        return true;
    }

    // Left diagonal check (Ugly scope hack)
leftDiagonalLoop:
    while(true) {
        let isP1Winner = b[0][0] === PLAYER_1_C;
        for(let i = 0; i < b.length; ++i) {
            if(b[i][i] !== (isP1Winner ? PLAYER_1_C : PLAYER_2_C)) break leftDiagonalLoop;
        }
        return true;
    }

    // Right diagonal check (Ugly scope hack)
rightDiagonalLoop:
    while(true) {
        let isP1Winner = b[0][b.length - 1] === PLAYER_1_C;
        for(let i = b.length - 1; i >= 0; --i) {
            if(b[b.length-1-i][i] !== (isP1Winner ? PLAYER_1_C : PLAYER_2_C)) break rightDiagonalLoop;
        }
        return true;
    }

    return false;
}

// Random boolean hack
let isP1 = Math.random() <= 0.5;

// Main loop
while(true) {
    visualize_app(board, isP1);

    let row, col;
    while(true) {
        try {
            [ col, row ] = getColRowFromInput(readLine.prompt())
            break;
        } catch(e) {
            console.log(e)
            console.log('Please retry')
        }
    }

    if(board[row][col] == EMPTY) board[row][col] = isP1 ? PLAYER_1_C : PLAYER_2_C;
    
    if(checkForWinner(board)) break;

    isP1 = !isP1;
}

console.log('GG');
console.log(isP1 ? 'Player 1 won' : 'Player 2 won')