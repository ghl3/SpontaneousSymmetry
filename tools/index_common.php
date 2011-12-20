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

  <head>
    <?php if( file_exists("title.inc") ) { include "title.inc"; } ?>
    <?php require "commonhead.inc";  ?>
    <?php if( file_exists("head.inc") )  { include "head.inc";  } ?>
  </head>

  <body>

    <?php
       require "header.inc";
       require "midsection_3column.inc";
       require "footer.inc";
       require "analytics/ga.inc";
       ?>
    
  </body>


</html>
