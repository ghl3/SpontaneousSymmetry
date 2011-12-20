
    <!-- Add default variable options: -->
    <?php
       if(! Isset($middle) ) $middle = "midcolumn.inc";
       if(! Isset($right) )  $right  = "rightcolumn.inc";
       ?>


    <!-- Build the structure of the body: -->
    <div class="midsection">
      
      <div class="midcol">
	<?php require $middle; ?>
      </div>

      <div class="rightcol">
	<?php require $right; ?>
      </div> 

      <div class="bar">
	<p>&nbsp;</p>
      </div>

    </div>
