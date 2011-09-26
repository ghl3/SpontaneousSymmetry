<?php session_start(); ?>
<!DOCTYPE html>

<!--
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    -->

<html>

  <?php
     $NUM_SLASH = substr_count($_SERVER["SCRIPT_NAME"], "/") - 1;
     $HOME_DIR = ($NUM_SLASH == 0) ? "./"  : str_repeat("../", $NUM_SLASH );
     ?>

  <!-- Include common head statements: -->
  <!-- Use commonhead.inc by default -->
  <?php 
     if( file_exists("head.inc") ) { include "head.inc"; }
     else {
     echo "<head>";
     include $HOME_DIR . "../tools/commonhead.inc";  
     echo "</head>";
     }
     ?>

  <!-- Make Body -->
  <!-- Use Common format by default -->
  <?php 
     if( file_exists("body.inc") ) { include "body.inc"; }
     else{
     echo "<body>";
     include $HOME_DIR . "../tools/header.inc";
     include $HOME_DIR . "../tools/midsection_3column.inc";
     include $HOME_DIR . "../tools/footer.inc";
     include $HOME_DIR . "../analytics/ga.inc";
     echo "</body>";
     }
     ?>

</html>
