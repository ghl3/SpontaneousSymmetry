

<?php

// Get the absolute home path
$HOME_DIR = realpath($_SERVER["DOCUMENT_ROOT"]) . "/";
set_include_path( $HOME_DIR . "../tools" . PATH_SEPARATOR . get_include_path() );

// Get the relative home path
$NUM_SLASH = substr_count($_SERVER["SCRIPT_NAME"], "/") - 1;
$HOME_DIR_REL = ($NUM_SLASH == 0) ? "./"  : str_repeat("../", $NUM_SLASH );

?>

