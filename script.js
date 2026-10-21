const CROSS_CURSOR = "url('./images/alpha-x-icon-red.svg')";
const NOUGHT_CURSOR = "url('./images/alpha-o-icon-red.svg')";

const CURSOR_X = 'X';
const CURSOR_O = 'O';

let current_cursor = CURSOR_X;

const GameBoard = (function () {
  // Private variable (inaccessible from the outside)
  const gameboard=[
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "]
];

let game_over = false;  // will contain false, 'X', or 'O'

let next_turn = null;

  function occupied(x, y) {
        if (gameboard[x][y] != ' ') {
            console.log(`gameboard[${x}][${y}] contains ${gameboard[x][y]}`);
            return true;
        }
        return false;
    }

  function _validate_coordinates(x, y) {
    if (x<0 ||x>2) {
        console.log(`Invalid x value: ${x}`);
        return false;
    }
    if (y<0 || y>2) {
        console.log(`Invalid y value: ${y}`);
        return false;
    }
    return true;
  }

  function _validate(XorO, x, y) {
    if (!_validate_coordinates(x, y)) {
        return false;
    }

    if (XorO != CURSOR_X && XorO != CURSOR_O) {
        console.log(`Must be ${CURSOR_X} or ${CURSOR_O}`);
        return false;
    }

    if (occupied(x, y)) {
        console.log("that space is occupied");
        return false;
    }
    return true;
  }
  
/**
 * Attempts to add a nought or cross to the specified location in the grid.  
 * Checks if the game is over, if so raises an exception with an error message
 * First it validates the parameters
 * then checks who's turn it is, then updates the gameboard
 * 
 * @param {*} XorO 
 * @param {*} x 
 * @param {*} y 
 * @returns boolean - indicates whether game is over
 * @exception - throws an exception if the game is already over
 */
  function _add(XorO, x, y) {
    if (game_over) {
        throw Error("Game is over.  Please start a new game to continue playing")
    }
    if (!_validate(XorO, x, y)) {
        throw Error("Validation failed");
    }
    if (next_turn == null) {
        next_turn = XorO;
    }

    if (next_turn != XorO) {
        throw Error(`It is not ${XorO}'s turn`);
    }

    gameboard[x][y] = XorO;

    (next_turn == 'X') ? next_turn = 'O' : next_turn = 'X';
    
    return _check_game_over();
  }

  function _column_equal(column) {
    let temp = new Set();
    for (let row=0; row < 3; row++) {
        temp.add(gameboard[row][column])
    }
    if (temp.size > 1) {
        return false;
    }
    if (temp.has('X')){
        return 'X';
    }
     else if (temp.has('O')) {
        return 'O';
    }
    return false;
  }

function _diagonal_equal() {
    let temp = new Set();

    // first top left to bottom right
    for (let i = 0; i < 3; i++) {
        temp.add(gameboard[i][i]);
    }
    
    if (temp.size == 1) {
        if (temp.has('X')) {
            return 'X';
         }
        else if (temp.has('O')) {
            return 'O';
        }
    }

    temp.clear();

    // Now top right to bottom left
    for (let i=0; i<3; i++) {
         for (let i = 0; i < 3; i++) {
            temp.add(gameboard[i][2-i]);
        }
    }
    
    if (temp.size == 1) {
        if (temp.has('X')) {
            return 'X';
         }
        else if (temp.has('O')) {
            return 'O';
        }
    }

    return false;
}

function _row_equal(row) {
    let temp = new Set();;
    for (let column=0; column < 3; column++) {
        temp.add(gameboard[row][column])
    }
    if (temp.size > 1) {
        return false;
    }
    if (temp.has('X')) {
        return 'X';
    }
    if (temp.has('O')) {
        return 'O';
    }
    return false;
  }

  function _check_game_over() {
    if (game_over)
    {
        return game_over;
    }
    let retval = _check_for_line();
    if (retval) {
        game_over = retval;
        return game_over;
    }
    // check case where all squares are filled but no winner, ie draw
    for (let row = 0; row<3; row++) {
        for (let column = 0; column<3; column++) {
            if (gameboard[row][column] == " ")
            {
                return game_over;   // should still be null
            }
        }
    }
    // else (no for...else construct in javascript)
    game_over = "D";    // draw
    return game_over;
  }

  function _check_for_line() {
    // check columns
    let retval;
    for (let column = 0; column < 3; column++) {
       retval = _column_equal(column);
       if (retval) {
        return retval;
       }
    } 
    // check rows
    for (let row = 0; row < 3; row++) {
       retval = _row_equal(row);
       if (retval) {
            return retval;
       }
    }
    retval = _diagonal_equal();
        if (retval) {
            return retval;
       }

    return false;
  }

  function _new_game() {
    game_over = false;  // will contain false, 'X', or 'O'

    next_turn = null;

    const newValue = " ";

    gameboard.forEach(row => row.fill(newValue));
  }



  // Public API returned to the user
  return {
    add(XorO, x, y) {
        return _add(XorO, x, y);
    },
    get(x, y) {
        if (!validate_coordinates(x, y)) {
            throw(RangeError("Invalid co=ordinates"));
        }
        return(gameboard[x][y]);
    }, 
    get_all() {
        let retval=[];
        for (let x=0; x<3; x++) {
            for (let y = 0; y < 3; y++) {
                retval.push(gameboard[x][y])
            }
        }
        return(retval);
    }, 
    check_game_over() {
        return(game_over);
    }, 
    newGame() {
        _new_game();
    }

  };
})();

function test() {
    GameBoard.add('O', 0, 0);
    GameBoard.add('X', 1, 2);
    GameBoard.add('O', 1, 1);
    GameBoard.add('X', 0, 2);
    GameBoard.add('O', 2, 2);
    gb=GameBoard.get_all();
    console.log(gb);
    go = GameBoard.check_game_over();
    if (go) {
        console.log(`game over: go = ${go}`);
    }
    else{
        console.log(`game not over: go = ${go}`);
    }
    GameBoard.new_game();
    console.log("Starting new game");

    GameBoard.add('O', 0, 0);   // 1
    GameBoard.add('X', 0, 1);   // 2
    GameBoard.add('O', 0, 2);   // 3

    GameBoard.add('X', 2, 0);   // 7
    GameBoard.add('O', 1, 1);   // 5 
    GameBoard.add('X', 1, 2);   // 6 
    GameBoard.add('O', 1, 0);   // 4
    
    console.log("Started new game");

    GameBoard.add('X', 2, 2);   // 9
    GameBoard.add('O', 2, 1);  // 8
    
    gb=GameBoard.get_all();
    console.log(gb);
    go = GameBoard.check_game_over();
    if (go) {
        console.log(`game over: go = ${go}`);
    }
    else{
        console.log(`game not over: go = ${go}`);
    }
}


// 1. Select the parent grid container
const grid = document.getElementById('myGameboard');
console.log(`grid = ${grid}`);

// 2. Listen for clicks on the entire container
grid.addEventListener('click', function(event) {
  // 3. Ensure the clicked element is actually a grid item square
  const clickedSquare = event.target.closest('.grid-item');
  
  // If the user clicked the gap between squares, ignore it
  if (!clickedSquare) return;

  // 4. Retrieve the unique index from the clicked element
  const index = clickedSquare.getAttribute('data-index');

  console.log(`index = ${index}`)
  const row = Math.floor(index / 3);
  console.log(`row = ${row}`)
  const col = ((index ) % 3);
  console.log(`col = ${col}`)

  // 3. Pass both values to your game function
  handleSquareClick(row, col, clickedSquare);
});



// Your updated game function
function handleSquareClick(row, col, element) {
    //is the square disabled?
    if (element.dataset.state == "disabled")
    {
        // do nothing
        return;
    }
    else {
        element.textContent = current_cursor;
    }
    console.log(`Clicked at Row: ${row}, Column: ${col}`);
  
    let add_result = GameBoard.add(current_cursor, row, col);

    if (add_result)
    {        
        changeCursor();         
        gameOver(add_result);

    }
    else{
        // Update data-state to disabled
        element.dataset.state="disabled";
        
        changeCursor();    
    }
}

function gameOver(winner) {
    // disable all buttons
    const allElements = Array.from(document.getElementsByClassName('grid-item'));
    allElements.forEach(el => {
        el.dataset.state="disabled";
    });
    if (winner=="D") {
        updateStatus(`Game over.  It was a draw`);
    }
    else {
        let winnerText;
        if (winner == 'X') {
            winnerText = document.getElementById("x-player").value;
        }
        else {
            winnerText = document.getElementById("o-player").value;
        }

        updateStatus(`Game over.  ${winnerText} is the winner`);
    }
}

function newGame() {
     const allElements = Array.from(document.getElementsByClassName('grid-item'));
    allElements.forEach(el => {
        el.dataset.state="clickable";
        el.textContent = "";
        GameBoard.newGame();
    });

    current_cursor = CURSOR_X;
    updateStatus("");
}

function changeCursor() {
    console.log("In changeCursor");    if (current_cursor == CURSOR_X) {
        console.log("In changeCursor 1");

        const gb = document.getElementById('myGameboard');
        gb.style.setProperty('cursor',`${NOUGHT_CURSOR} 0 0, auto`,'important');
        
        current_cursor = CURSOR_O;
    }
    else {
        const gb = document.getElementById('myGameboard');
        gb.style.setProperty('cursor',`${CROSS_CURSOR} 0 0, auto`,'important');
        current_cursor = CURSOR_X;
    }


}

const btn = document.getElementById("newGameButton");

btn.addEventListener("click", () => {
  console.log("New game button clicked");
  newGame();
});

function updateStatus(status) {
    st = document.getElementById("game-status");
    st.textContent = status;
}