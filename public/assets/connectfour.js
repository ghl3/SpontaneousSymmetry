var NUM_ROWS = 6;
var NUM_COLUMNS = 7;

var HUMAN = "human";
var COMPUTER = "computer";

var TURN = HUMAN;
var GAME_IS_OVER = false;

// Add elements to the grid on load
BOARD = null;

function createGrid(gridId) {
  // Get the Grid
  var grid = document.getElementById(gridId);

  for (let i = 0; i < NUM_ROWS; ++i) {
    for (let j = 0; j < NUM_COLUMNS; ++j) {
      var elem = document.createElement("div");
      elem.className =
        "grid-item" + " " + "space" + " " + "row-" + i + " " + "col-" + j;
      elem.onclick = function() {
        console.log("Clicked on " + i + " " + j);
        placePieceInColumn(BOARD, HUMAN, j);
        processBoard(BOARD, HUMAN, COMPUTER);
      };
      grid.appendChild(elem);
    }
  }
}

function clearGrid(gridId) {
  var grid = document.getElementById(gridId);
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
}

function createBoard() {
  var BOARD_COLUMNS = [];
  for (let j = 0; j < NUM_COLUMNS; ++j) {
    BOARD_COLUMNS.push([]);
  }

  return BOARD_COLUMNS;
}

function resetBoard() {
  clearGrid("board");
  createGrid("board");
  BOARD = createBoard();
  document.getElementById("gameState").innerHTML = "";
  GAME_IS_OVER = false;
}

function placePieceInColumn(board, player, col) {
  var row = null;

  if (GAME_IS_OVER) {
    console.log("CANNOT PLACE PIECE, GAME IS OVER");
    return;
  }

  if (TURN != player) {
    console.log("CANNOT PLACE PIECE, NOT PLAYER'S TURN");
  }

  if (board[col].length >= NUM_ROWS) {
    console.log("CANNOT ADD TO COLUMN, TOO MANY PIECES ALREADY");
    return;
  } else {
    row = NUM_ROWS - board[col].length - 1;
  }

  console.log("Adding piece to col " + col);
  console.log("Updating Row " + row + " " + " col: " + col);

  var colorClass;
  if (player == HUMAN) {
    playerClass = "human-space";
  } else if (player == COMPUTER) {
    playerClass = "computer-space";
  } else {
    console.log("ERROR: Bad player " + player);
    return;
  }

  // Color the piece
  var color = player == HUMAN ? "blue" : "red";
  var elem = document.querySelector(".grid-item.row-" + row + ".col-" + col);
  elem.appendChild(createPiece(color));
  elem.className += " " + playerClass;

  BOARD[col].push(player);

  // Swap the player
  TURN = player == HUMAN ? COMPUTER : HUMAN;
}

function createPiece(color) {
  var svgns = "http://www.w3.org/2000/svg";

  var svg = document.createElementNS(svgns, "svg");
  svg.setAttribute("width", "80");
  svg.setAttribute("height", "80");
  svg.setAttributeNS(
    "http://www.w3.org/2000/xmlns/",
    "xmlns:xlink",
    "http://www.w3.org/1999/xlink"
  );

  var circle = document.createElementNS(svgns, "circle");
  circle.setAttributeNS(null, "cx", 40);
  circle.setAttributeNS(null, "cy", 40);
  circle.setAttributeNS(null, "r", 30);
  circle.setAttributeNS(null, "fill", color);
  circle.setAttributeNS(null, "stroke", "black");
  circle.setAttributeNS(null, "stroke-width", "3");
  svg.appendChild(circle);
  return svg;
}

function processBoard(board, previous_player, current_player) {
  const Url = "/connectfour/next-move";

  const Data = {
    board: board,
    current_player: current_player,
    previous_player: previous_player
  };
  const Params = {
    headers: { "content-type": "application/json; charset=UTF=8" },
    body: JSON.stringify(Data),
    method: "POST"
  };

  fetch(Url, Params)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok.");
      }
    })
    .then(data => {
      console.log(data);
      return data;
    })
    .then(res => {
      processMoveResult(res);
    })
    .catch(error => console.log(error));
}

function processMoveResult(move) {
  if (GAME_IS_OVER) {
    return;
  }

  if (TURN != COMPUTER) {
    console.log("TURN IS: " + TURN);
    return;
  }

  if (move["error"] != null) {
    console.log("ERROR: " + move["error"]);
    return;
  }

  if (move["col_to_play"] != null) {
    placePieceInColumn(BOARD, COMPUTER, move["col_to_play"]);
  }

  if (move["outcome_after_move"] != null) {
    if (move["outcome_after_move"] == "CURRENT_PLAYER_WINNER") {
      console.log("COMPUER WON");
      document.getElementById("gameState").innerHTML = "COMPUTER WON";
    } else if (move["outcome_after_move"] == "PREVIOUS_PLAYER_WINNER") {
      console.log("HUMAN WON");
      document.getElementById("gameState").innerHTML = "HUMAN WON";
    } else {
      console.log("ERROR, UNKNOWN WINNER: " + move["outcome_after_move"]);
      document.getElementById("gameState").innerHTML = "GAME ERROR";
    }
    GAME_IS_OVER = true;
  }
}

$(document).ready(function() {
  createGrid("board");
  BOARD = createBoard();
});
