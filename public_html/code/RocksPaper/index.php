<?php session_start(); ?>
<!DOCTYPE html>


<html>

  <?php require realpath($_SERVER["DOCUMENT_ROOT"]) . "/../tools/phpcommon.php" ; ?>

  <head>

    <title> Bouncing Balls </title>
    <?php require "commonhead.inc";  ?>

    <script type="text/javascript" src="/jquery/jquery.js"></script>
    <script type="text/javascript" src="/jquery/jquery.validate.min.js"></script>
    <script type="text/javascript" src="/jquery/functions/CodeVisualization.js"></script>

    <script type="text/javascript" src="RocksPaper.js"></script>  
    
    <!-- Include google's "code prettify" functions: -->
    <?php require "prettify.inc";  ?>

  </head>

  <body onload="prettyPrint()" >

    <?php
       require "header.inc";

       require "midsection_1column.inc";
       require "footer.inc";
       require "analytics/ga.inc";
       
       ?>
    
  </body>
  
  
</html>
