

<?php

/* Open the handle to the python process,
   Get the values, 
   and fill the #return field (done automatically
   using jquery). */

error_reporting(E_ALL);

if( isset($_POST['quada']) ){
  if( isset($_POST['quadb']) ){
    if( isset($_POST['quadc']) ){

      $quada = $_POST['quada'];
      $quadb = $_POST['quadb'];
      $quadc = $_POST['quadc'];


      /* Add redirection so we can get stderr. */
      $handle = popen('python Quadratic.py ' . $quada . ' ' . $quadb . ' ' . $quadc . ' 2>&1', 'r');
      $read = fread($handle, 2096);
      echo "Solution to the Quadratic equation:<br>";
      echo $read;
      pclose($handle);

    }
  }
}
   
?>
