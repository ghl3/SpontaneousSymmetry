
<br>
<center><b>Rocks Paper Scissors</b></center>
<br>

<center>
This page implements a simple game of<br>
Rocks Paper Scissors against a computer opponent.
</center>
<br>

<center>
  Strategy: <br>
  <select name="strategy" id="strategy">
    <option>Random</option>
    <option>Smart</option>
  </select>
</center>

<br>

<center> 
<table border="1" style="width:50%; font-size: 24px; text-align: center;">
  <tr>
    <td> Games</td> <td> Player</td>  <td> Computer</td> <td> Ties </td>
  </tr>
  <tr>
    <td> <div id="GamesPlayed"></div> </td>  
    <td> <div id="PlayerScore"></div> </td>  
    <td> <div id="ComputerScore"></div></td>
    <td> <div id="GamesTied"></div> </td>  
  </tr>
</table>
<center>
</div>
</center>


<br>
<br>
<center>
  <table style="font-size: 18px;" width="100%" >
    <tr>
      <td width="100px" align="right"> Player Played:</td> 
      <td width="100px" align="left"> <div id="PlayerMove"></div> </td>  
    </tr>
    <tr>
      <td width="100px" align="right"> Computer Played:</td> 
      <td width="100px" align="left"> <div id="ComputerMove"></div> </td>  
    </tr>
  </table>
</center>
<br>
<br>

<center>
  Your Move: <br>
  <button class="nicebutton" id="Rocks"    OnClick="PlayRocks()">Rocks</button>
  <button class="nicebutton" id="Paper"    OnClick="PlayPaper()">Paper</button>
  <button class="nicebutton" id="Scissors" OnClick="PlayScissors()">Scissors</button>
</center>

<br>
<hr width="90%" />
<br>


<!--Result of the program: -->
<!-- Results go here (filled by jquery) -->
<center>
  <button class="nicebutton" id="ShowGameLog" OnClick="ShowGameLog()">Show/Hide Game Log</button>
  <button class="nicebutton" id="showcodebutton">Show/Hide Code</button>
</center>

<br>
<br>
<center>
  <div id="GameLog" style="width: 200px; border: 1px solid black;"  >
    <div id="GameLogHolder"> No Games Played Yet<br> </div>
    <table id="GameLogTable" style="font-size: 12px;" width="100%" >
    </table>
  </div>
</center>
<!--<div id="debug" ></div>-->

<div id="showcode" > 

  <?php   
     echo '<pre class="prettyprint" id="python">';
     include "RocksPaper.js";
     echo '</pre>';
     ?>  

</div>
