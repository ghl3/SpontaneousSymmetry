
<?php
   
   //   if(isset($_GET['aboutme'])){

   if(! Isset($left) )   $left   = "left.inc";
   if(! Isset($middle) ) $middle = "midcolumn.inc";
   if(! Isset($right) )  $right  = "rightcolumn.inc";

   ?>


<?php include "header.inc"; ?>



<div class="midsection">

  
  <div class="leftcol">
    
    <?php include $left; ?>
    
  </div>
  
  
  <div class="midcol">

    <?php include $middle; ?>

  </div>

  <div class="rightcol">
    
    <?php include $right; ?>

  </div> 

  <div class="bar">
    
    <p>&nbsp;</p>
    
  </div>

</div>

<?php include "footer.inc"; ?>
<?php include $HOME_DIR . "../analytics/ga.inc"; ?>
