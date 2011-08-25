
<?php

include "/home/spontane/tools/password.inc"


$con = mysql_connect(localhost,$username,$password);
if (!$con)
  {
    die("Could not connect to database");
  }

@mysql_select_db("spontane_data", $con);

if ( isset($_POST) && !empty($_POST) ) {


 $firstname = check_input( $_POST['firstname'] );
 $lastname  = check_input( $_POST['lastname'] );
 $email     = check_input( $_POST['email'] );
 $message   = check_input( $_POST['message'] );

if ( $message == "" ) {

echo "You did not enter any message. <br> ";

} 
else {

 $sql = "INSERT INTO Users (FirstName, LastName, Email, Message)
               VALUES ('$firstname','$lastname','$email','$message')";



  if (!mysql_query($sql,$con))
  {
    die("Error: Could not insert information into database");
  }

  mysql_close($con);

  echo "Thank you, your message has been delivered!";  
  echo "  Please feel free to continue browsing this site.";

} // POST is set and not empty

}

else {
 echo "You did not enter any input <br>";
}

?>


Return to the <a href="/test">comments</a> section or go to the <a href="/">home</a> page.

<?php
function check_input($data, $error='')
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>