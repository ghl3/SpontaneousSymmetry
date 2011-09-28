

var PlayerMoves   = new Array();
var ComputerMoves = new Array();


function PlayRocks() { Play("Rocks");  }
function PlayPaper() { Play("Paper");  }
function PlayScissors() { Play("Scissors");  }

function GetCompMove() {

    var RandChoice = Math.random();

    if( RandChoice < 1/3)   return "Rocks";
    else if( RandChoice < 2/3) return "Paper";
    else                    return "Scissors";


}


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


    // Player Move
    PlayerMoves.push( Move );
    document.getElementById("PlayerMove").innerHTML = Move;

    // Calculate Computer Move
    var CompMove = GetCompMove( PlayerMoves );
    ComputerMoves.push(CompMove);
    document.getElementById("ComputerMove").innerHTML = CompMove;


    // Display Winner
    var Winner = GetWinner(Move, CompMove);
    if( Winner == 1) PlayerWins++;
    if( Winner == 2) ComputerWins++;
    if( Winner == 0) Ties++;

    UpdateScoreboard();
    AddRowToLog(Move, CompMove, GamesPlayed);

    GamesPlayed++;

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

