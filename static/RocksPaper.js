

var PlayerMoves   = new Array();
var ComputerMoves = new Array();


function PlayRocks() { Play("Rocks");  }
function PlayPaper() { Play("Paper");  }
function PlayScissors() { Play("Scissors");  }


function GetWinner( MoveA, MoveB ) {

    // 1 = Player A wins
    // 2 = Player B wins
    // 0 = Tie

    if( MoveA == "Rocks"    && MoveB == "Paper" ) return 2;
    if( MoveA == "Paper"    && MoveB == "Paper" ) return 0;
    if( MoveA == "Scissors" && MoveB == "Paper" ) return 1;

    if( MoveA == "Rocks"    && MoveB == "Rocks" ) return 0;
    if( MoveA == "Paper"    && MoveB == "Rocks" ) return 1;
    if( MoveA == "Scissors" && MoveB == "Rocks" ) return 2;

    if( MoveA == "Rocks"    && MoveB == "Scissors" ) return 1;
    if( MoveA == "Paper"    && MoveB == "Scissors" ) return 2;
    if( MoveA == "Scissors" && MoveB == "Scissors" ) return 0;

}

function BeatMove( Move ) {

    if(Move == "Rocks" )    return "Paper";
    if(Move == "Paper" )    return "Scissors";
    if(Move == "Scissors" ) return "Rocks";

}


var GamesPlayed = 0;
var PlayerWins = 0;
var ComputerWins = 0;
var Ties = 0;

function UpdateScoreboard() {
    document.getElementById("GamesPlayed").innerHTML   = GamesPlayed;
    document.getElementById("PlayerScore").innerHTML   = PlayerWins;
    document.getElementById("ComputerScore").innerHTML = ComputerWins;
    document.getElementById("GamesTied").innerHTML     = Ties;
}

function AddRowToLog( PlayerMove, ComputerMove, GamesPlayed) {
    

    $('div#GameLogHolder').hide();
    
    var table = document.getElementById('GameLogTable').insertRow(GamesPlayed);
    var col1 = table.insertCell(0);
    var col2 = table.insertCell(1);
    
    col1.align = "center";
    col2.align = "center";
    
    col1.width = "30px";
    col2.width = "30px";
    
    var Result = GetWinner(PlayerMove, ComputerMove);

    if( Result == 1 ) col1.style.fontWeight = "bold";
    if( Result == 2 ) col2.style.fontWeight = "bold";

    col1.innerHTML = PlayerMove;
    col2.innerHTML = ComputerMove;

}

function Play( Move ) {


    // Calculate Computer Move
    // Based only on previous moves
    // (New player move not yet added to list)
    var CompMove = GetCompMove( PlayerMoves );
    ComputerMoves.push(CompMove);
    document.getElementById("ComputerMove").innerHTML = CompMove;

    // Now add player move to list of moves
    PlayerMoves.push( Move );
    document.getElementById("PlayerMove").innerHTML = Move;


    // Display Winner
    var Winner = GetWinner(Move, CompMove);
    if( Winner == 1) PlayerWins++;
    if( Winner == 2) ComputerWins++;
    if( Winner == 0) Ties++;

    UpdateScoreboard();
    AddRowToLog(Move, CompMove, GamesPlayed);

    GamesPlayed++;

}

var CompStrategy = "Random";

function GetCompMove() {

    CompStrategy = document.getElementById("strategy").value;
    
    //document.getElementById("debug").innerHTML += CompStrategy + "<br>";

    if( CompStrategy == "Random" ) {
	return RandomGuess();
    }

    if( CompStrategy == "Smart" ) {

	var Guess;

	Guess = SmartStrat(5);
	if( Guess == "NoGuess" ) Guess = SmartStrat(4);
	if( Guess == "NoGuess" ) Guess = SmartStrat(3);
	if( Guess == "NoGuess" ) Guess = SmartStrat(2);
	if( Guess == "NoGuess" ) Guess = RandomGuess();
	
	return Guess;

    }

}


function RandomGuess() {
    
    var RandChoice = Math.random();
    
    if( RandChoice < 1/3)      return "Rocks";
    else if( RandChoice < 2/3) return "Paper";
    else                       return "Scissors";

}

function SmartStrat( PatternLength ) {

    var NumPlayerMoves = PlayerMoves.length;

    if( NumPlayerMoves <= PatternLength ) return "NoGuess";

    RecentSubpattern = PlayerMoves.slice(NumPlayerMoves-PatternLength, NumPlayerMoves);

    //document.getElementById("debug").innerHTML += "Recent: " + RecentSubpattern.toString() + "<br>";

    for( var i = 0; i < PlayerMoves.length - PatternLength; i++) {

	var CurrentSubpattern = PlayerMoves.slice(i, i+PatternLength);

	//document.getElementById("debug").innerHTML += "Current: " + CurrentSubpattern.toString() + "<br>";

	if( compare(CurrentSubpattern,RecentSubpattern) == true ) {
	    //document.getElementById("debug").innerHTML += "Found Pattern: " + PlayerMoves[i + PatternLength] + "<br>";
	    return BeatMove(PlayerMoves[i + PatternLength]);
	}
    }

    return "NoGuess";

}



function compare(x, y) {
    if (x === y) {//For reference types:returns true if x and y points to same object
	return true;
    }
    if (x.length != y.length) {
	return false;
    }
    for (key in x) {
	if (x[key] !== y[key]) {//!== So that the the values are not converted while comparison
	    return false;
	}
    }
    return true;
}



$(document).ready(function(){
    $('div#GameLog').hide();
    $("button#ShowGameLog").click(function(){
	$("div#GameLog").toggle("fast");
    });
});


$(document).ready(function() {
    UpdateScoreboard();
});  

