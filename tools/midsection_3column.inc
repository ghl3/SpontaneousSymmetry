
    <!-- Add default variable options: -->
    <?php
       if(! Isset($left) )   $left   = "left.inc";
       if(! Isset($middle) ) $middle = "midcolumn.inc";
       if(! Isset($right) )  $right  = "rightcolumn.inc";
       ?>


    <!-- Build the structure of the body: -->
    <div class="midsection">
      
      <div class="leftcol">
	<?php if( file_exists($left) ) include $left; ?>
      </div>
      
      <div class="midcol">
	<?php if( file_exists($middle) ) include $middle; ?>
      </div>

      <div class="rightcol">
	<?php if( file_exists($right) ) include $right; ?>
      </div> 

      <div class="bar">
	<p>&nbsp;</p>
      </div>

    </div>
