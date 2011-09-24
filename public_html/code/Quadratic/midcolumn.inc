
<br>
<center><b>CODE</b></center>
<br>

This is a simple example program to return
the zero's of a quadratic equation (just for fun): <br>

<br>

<!--<script type="text/javascript" src="submitQuadForm.js"></script>-->
<form name="QuadraticForm" id="QuadraticForm" action="" method="POST">
  <!-- Field 1 -->
    <fieldset>
      <legend>Quadratic Solver</legend>

      <label for="a" accesskey="f">a: </label>
      <input type="text" id="quada" name="quada" tabindex="1"  title="a"><br>

      <label for="b" accesskey="f">b: </label>
      <input type="text" id="quadb" name="quadb" tabindex="2"  title="b"><br>

      <label for="c" accesskey="f">c: </label>
      <input type="text" id="quadc" name="quadc" tabindex="3"  title="c"><br>

      <label for="submit" action="." class="required" accesskey="e"></label>
      <input type="submit" name="submit" value="Submit" >

    </fieldset>
  </form>

<br>
<br>

<!--Result of the program: -->
<!-- Results go here (filled by jquery) -->
<div id="results" ></div>         


<br>
<br>


<button id=showcode>Show/Hide Code</button>

<div id=showcode> 

  <?php   
     echo '<pre class="prettyprint" id="python">';
     include "Quadratic.py";
     echo '</pre>';
     ?>  

</div>
