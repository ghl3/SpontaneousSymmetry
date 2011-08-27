<?php session_start(); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>

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

    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" >

    <link rel="stylesheet" href="/styles/style.css" type="text/css" media="screen">

    
    <link href="/google-code-prettify/prettify.css" type="text/css" rel="stylesheet" />
    <script type="text/javascript" src="/google-code-prettify/prettify.js"></script>


    <?php include "title.inc"; ?>
    
    <meta name="keywords" content="spontaneous symmetry, spontaneoussymmetry, george lewis, Higgs, ATLAS, CERN, Statistics, physics, quark" >

    <?php include $HOME_DIR . "../tools/commonhead.inc"; ?>

  </head>

  <body onload="prettyPrint()">


    <!-- The body script uses the following variables:
	 $middle
	 $right
      -->

    <?php include $HOME_DIR . "../tools/body.inc"; ?>
    
  </body>

</html>
