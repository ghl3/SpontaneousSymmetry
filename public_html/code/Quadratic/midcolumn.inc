
<br>
<center><b>Quadratic Solver</b></center>
<br>

<center>
This is a simple example program to return <br>
the zero's of a quadratic equation (just for fun): <br>
<br>

Solve: ax^2 + bx + c = 0

</center>
<br>

<!--<script type="text/javascript" src="submitQuadForm.js"></script>-->
<div style="margin: auto; width:80%;">
<form name="QuadraticForm" id="QuadraticForm" action="" method="POST">
  <!-- Field 1 -->
    <fieldset>
      <legend>Quadratic Solver</legend>

      <label accesskey="f">a: </label>
      <input type="text" id="quada" name="quada" tabindex="1"  title="a"><br>

      <label accesskey="f">b: </label>
      <input type="text" id="quadb" name="quadb" tabindex="2"  title="b"><br>

      <label accesskey="f">c: </label>
      <input type="text" id="quadc" name="quadc" tabindex="3"  title="c"><br>

<!--      <label for="submit" action="." class="required" accesskey="e"></label>-->
     <label class="required" accesskey="e"></label>
      <input type="submit" name="submit" value="Submit" >

    </fieldset>
  </form>
</div>

<center>
<br>
<br>

<!--Result of the program: -->
<!-- Results go here (filled by jquery) -->
<div id="results" ></div>         


<br>
<br>


<button id="showcodebutton">Show/Hide Code</button>

</center>

<div id="showcode"> 

  <?php   
     echo '<pre class="prettyprint" id="python">';
     include "Quadratic.py";
     echo '</pre>';
     ?>  

</div>
