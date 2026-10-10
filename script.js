const GameBoard = (function () {
  // Private variable (inaccessible from the outside)
  const gameboard=[
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "]
];

var game_over = false;

  function occupied(x, y) {
        if (gameboard[x][y] != ' ') {
            console.log(`gameboard[${x}][${y}] contains ${gameboard[x][y]}`);
            return true;
        }
        return false;
    }

  function validate_coordinates(x, y) {
    if (x<0 ||x>2) {
        console.log("Invalid x value");
        return false;
    }
    if (y<0 || y>2) {
        console.log("Invalid y value");
        return false;
    }
    return true;
  }
  function validate(XorO, x, y) {
    if (!validate_coordinates(x, y)) {
        return false;
    }

    if (XorO != 'X' && XorO != 'O') {
        console.log("Must be X or O");
        return false;
    }

    if (occupied(x, y)) {
        console.log("that space is occupied");
        return false;
    }
    return true;
  }

  function _add(XorO, x, y) {
    if (!validate(XorO, x, y)) {
        return;
    }
    gameboard[x][y] = XorO;
  }

  function _column_equal(column) {
    let temp = new Set();;
    for (let row=0; row < 3; row++) {
        temp.add(gameboard[row][column])
    }
    if (temp.size > 1) {
        return false;
    }
    if (temp.has('X') || temp.has('O')) {
        return true;
    }
    return false;
  }

function _diagonal_equal() {
    let temp = new Set();

    // first top left to bottom right
    for (let i = 0; i < 3; i++) {
        temp.add(gameboard[i][i]);
    }
    
    if (temp.has('X') || temp.has('O')) {
        if (temp.size == 1) {
            return true;
        }
    }

    temp.clear();

    // Now top right to bottom left
    for (let i=0; i<3; i++) {
         for (let i = 0; i < 3; i++) {
            temp.add(gameboard[i][2-i]);
        }
    }
    if (temp.has('X') || temp.has('O')) {
        if (temp.size == 1) {
            return true;
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
    if (temp.has('X') || temp.has('O')) {
        return true;
    }
    return false;
  }

  function _check_for_line() {
    // check columns
    for (let column = 0; column < 3; column++) {
       if (_column_equal(column))
       {
        return true;
       }
    } 
    // check rows
    for (let row = 0; row < 3; row++) {
       if (_row_equal(row))
       {
        return true;
       }
    }
    if (_diagonal_equal()) {
        return true;
    } 
    return false;
  }

  // Public API returned to the user
  return {
    add(XorO, x, y) {
        _add(XorO, x, y);
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
    check_for_line() {
        return(_check_for_line());
    }
  };
})();