
<?php

$username = "spontane_ghl227";
$password = "kO!103vI";


$con = mysql_connect(localhost,$username,$password);

if (!$con)
  {
    die("Could not connect to database");
  }

@mysql_select_db("spontane_data", $con);

$query  = "SELECT * FROM Users";
$result = mysql_query($query);

$numRows = mysql_numrows($result);

mysql_close();

echo "<br><b>Comments:</b><br>";

echo "<br>";

for ($i = 0; $i < $numRows; $i++) {

 $firstname = mysql_result($result, $i, "firstname");
 $lastname  = mysql_result($result, $i, "lastname");
 $message   = mysql_result($result, $i, "message");

 echo "$firstname $lastname: <i>$message</i> <br>"; 
 echo "<br>"; 

}

?>