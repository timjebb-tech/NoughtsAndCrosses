const GameBoard = (function () {
  // Private variable (inaccessible from the outside)
  const gameboard=[
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "]
];
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
    }
  };
})();