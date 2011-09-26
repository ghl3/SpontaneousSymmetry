<?php session_start(); ?>
<!DOCTYPE html>

<!--
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
-->

<html>


  <!-- Initialize some variables: -->
  <?php
     $NUM_SLASH = substr_count($_SERVER["SCRIPT_NAME"], "/") - 1;
     $HOME_DIR = ($NUM_SLASH == 0) ? "./"  : str_repeat("../", $NUM_SLASH );

     // Get the variables from the POST
     // possibly holding the information about
     // which middle and side scripts to load

     if (isset($_POST['middleColumn'])) $middle = $_POST['middleColumn'];
     if (isset($_POST['rightColumn']))  $right  = $_POST['rightColumn'];

     ?>

  <head>	

    <!-- Include common head statements: -->
    <?php include $HOME_DIR . "../tools/commonhead.inc"; ?>

    <!-- Make the title of the Page: -->
    <?php if( file_exists("title.inc") ) include "title.inc"; ?>
    
    <!-- Include any additional head statements: -->
    <?php if( file_exists("head.inc") ) include "head.inc"; ?>


  </head>


  <!-- Make the title of the Page: -->
  <?php 
     if( file_exists("bodytag.inc") ) { include "bodytag.inc"; }
     else { echo "<body >";}

     ?>


    <!-- Add default variable options: -->
    <?php
       if(! Isset($left) )   $left   = "left.inc";
       if(! Isset($middle) ) $middle = "midcolumn.inc";
       if(! Isset($right) )  $right  = "rightcolumn.inc";
       ?>

    <!-- Add the Common Header: -->
    <?php include "header.inc"; ?>

    <!-- Build the structure of the body: -->
    <div class="midsection">
      
      <div class="leftcol">
	<?php if( file_exists($left) ) include $left; ?>
      </div>
      
      <div class="midcol">
	<?php if( file_exists($middle) ) include $middle; ?>
      </div>

      <div class="rightcol">
	<?php if( file_exists($right) ) include $right; ?>
      </div> 

      <div class="bar">
	<p>&nbsp;</p>
      </div>

    </div>

    <!-- Add the footer: -->
    <?php include "footer.inc"; ?>

    <!-- Add analytics: -->
    <?php include $HOME_DIR . "../analytics/ga.inc"; ?>


    <?php /* include $HOME_DIR . "../tools/body.inc";*/ ?>
    
  </body>

</html>
