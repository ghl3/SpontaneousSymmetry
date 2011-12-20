<?php session_start(); ?>
<!DOCTYPE html>


<html>

  <?php require realpath($_SERVER["DOCUMENT_ROOT"]) . "/../tools/phpcommon.php" ; ?>

  <head>
    
    <title> Quadratic </title>

    <?php require "commonhead.inc";  ?>


    <script type="text/javascript" src="/jquery/jquery.js"></script>
    <script type="text/javascript" src="/jquery/functions/CodeVisualization.js"></script>
    <script type="text/javascript" src="/jquery/jquery.validate.min.js"></script>

    <script type="text/javascript" src="FormValidate.js"></script>
   <!-- <script type="text/javascript" src="draw.js"></script> -->
    
    <?php require "prettify.inc";  ?>

    <!-- Include google's "code prettify" functions: -->
<!--
    <link href="/google-code-prettify/prettify.css" type="text/css" rel="stylesheet" >
    <script type="text/javascript" src="/google-code-prettify/prettify.js"></script>
-->
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
