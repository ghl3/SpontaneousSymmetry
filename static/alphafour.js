

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


function createPiece(color) {

    /*
      <svg height="100" width="100">
      <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
      </svg>
    */

    var svgns = "http://www.w3.org/2000/svg";
    
    var svg = document.createElementNS(svgns, "svg");
    //svg.setAttribute('style', 'border: 1px solid black');
    svg.setAttribute('width', '80');
    svg.setAttribute('height', '80');
    svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

    var circle = document.createElementNS(svgns, 'circle');
    circle.setAttributeNS(null, 'cx', 40);
    circle.setAttributeNS(null, 'cy', 40);
    circle.setAttributeNS(null, 'r', 30);
    circle.setAttributeNS(null, "fill", color);
    circle.setAttributeNS(null, "stroke", "black");
    circle.setAttributeNS(null, "stroke-width", "3");
    //circle.setAttributeNS(null, 'style', 'fill: none; stroke: blue; stroke-width: 1px;' );
    svg.appendChild(circle);
    //    svg.appendChild
    return svg;
}


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
    elem.appendChild(createPiece(color));
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
	    //elem.textContent = "" + i + " " + j;
	    elem.onclick = function() { console.log("Clicked on " + i + " " + j); placePieceInColumn("red", j); }; 
	    grid.appendChild(elem);
	}
    }
}

$(document).ready(function(){createGrid("board")});
