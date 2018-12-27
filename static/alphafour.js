

// FOO


// Add elements to the grid on load

var NUM_ROWS = 6;
var NUM_COLUMNS= 7;


var BOARD_COLUMNS = []
for (let j=0; j < NUM_COLUMNS; ++j) {
    BOARD_COLUMNS.push([]);
}
/*
var BOARD = [];
for (let i=0; i < NUM_ROWS; ++i) {
    var row = [];
    BOARD.push(row);
}

console.log(BOARD);
*/


function placePieceInColumn(color, col) {

    var row = null;
    
    if (BOARD_COLUMNS[col].length >= NUM_ROWS) {
	console.log("CANNOT ADD TO COLUMN, TOO MANY PIECES ALREADY");
	return;
    } else {
	row = NUM_ROWS - BOARD_COLUMNS[col].length - 1;
    }

    console.log("Adding piece to col " + col);
    console.log("Updating Row " + row + " " + " col: " + col);
    
    var colorClass;
    if (color == "red") {
	colorClass = "red-space";
    } else if (color == "blue") {
        colorClass = "blue-space";
    } else {
	console.log("ERROR: Bad color " + color);
	return;
    }
    
    // Color the piece
    var elem = document.querySelector(".grid-item.row-" + row + ".col-" + col);
    console.log(elem);
    elem.className += " " + colorClass;

    BOARD_COLUMNS[col].push(color);
				      
    // Then, we determine the next move

}

function createGrid(gridId) {

    // Get the Grid
    var grid = document.getElementById(gridId); //$(gridId);

    for (let i=0; i < NUM_ROWS; ++i) {
	for (let j=0; j < NUM_COLUMNS; ++j) {

	    var elem = document.createElement("div");
	    elem.className = "grid-item" + " " + "space" + " " + "row-" + i + " " + "col-" + j; ////<div class="grid-item">
	    elem.textContent = "" + i + " " + j;
	    elem.onclick = function() { console.log("Clicked on " + i + " " + j); placePieceInColumn("red", j); }; 
	    grid.appendChild(elem);
	}
    }
}

$(document).ready(function(){createGrid("board")});
