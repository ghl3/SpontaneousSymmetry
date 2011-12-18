<?php session_start(); ?>
<!DOCTYPE html>


<html>


<!-- 
     Sets up:

     $HOME_DIR     (aboslute path)
     $HOME_DIR_REL (relative path ) 

     and adds to the include path
-->
  <?php require realpath($_SERVER["DOCUMENT_ROOT"]) . "/../tools/phpcommon.php" ; ?>


<!--
  <?php
/*
     $NUM_SLASH = substr_count($_SERVER["SCRIPT_NAME"], "/") - 1;
     $HOME_DIR_REL = ($NUM_SLASH == 0) ? "./"  : str_repeat("../", $NUM_SLASH );
*/
     ?>
-->

<!--
  <?php 
/*
     if( file_exists("head.inc") ) { require "head.inc"; }
     else {
     echo "<head>";
     require $HOME_DIR_REL . "../tools/commonhead.inc";  
     echo "</head>";
     }
*/
     ?>
-->

<head>
  <?php if( file_exists("title.inc") ) { include "title.inc"; } ?>
  <?php require $HOME_DIR_REL . "../tools/commonhead.inc";  ?>
</head>


  <!-- Make Body -->
  <!-- Use Common format by default -->

<!--

  <?php 
/*
     if( file_exists("body.inc") ) { require "body.inc"; }
     else{
     echo "<body>";

     require $HOME_DIR_REL . "../tools/header.inc";
     require $HOME_DIR_REL . "../tools/midsection_3column.inc";
     require $HOME_DIR_REL . "../tools/footer.inc";
     require $HOME_DIR_REL . "../analytics/ga.inc";
     echo "</body>";
     }
*/
     ?>
-->


<body>
  <?php
     
     require $HOME_DIR_REL . "../tools/header.inc";
     
     require $HOME_DIR_REL . "../tools/midsection_3column.inc";
     require $HOME_DIR_REL . "../tools/footer.inc";
     require $HOME_DIR_REL . "../analytics/ga.inc";
     
     ?>
  
</body>


</html>
