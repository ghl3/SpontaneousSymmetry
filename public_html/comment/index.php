
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">


<html>


  <?php
     $NUM_SLASH = substr_count($_SERVER["SCRIPT_NAME"], "/") - 1;
     $HOME_DIR = ($NUM_SLASH == 0) ? "./"  : str_repeat("../", $NUM_SLASH );
     ?>


 <head>	

  <meta http-equiv="Content-Type" content="text/html;charset=utf-8" >

  <link rel="stylesheet" href="/styles/style.css" type="text/css" media="screen">

  <title>Comments</title>

    <?php include $HOME_DIR . "../tools/commonhead.inc"; ?>

 </head>
 
 <body>

<?php 

  // $middle = "midcolumn.inc";
  // $right  = "rightcolumn.inc";

   include $HOME_DIR . "../tools/body.inc";

?>

 </body>

</html>

