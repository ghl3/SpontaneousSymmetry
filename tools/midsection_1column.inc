
    <!-- Add default variable options: -->
    <?php
       if(! Isset($middle) ) $middle = "midcolumn.inc";
       ?>
    

    <!-- Build the structure of the body: -->
    <div class="midsection">
      
      <div class="centralcol">
	<?php if( file_exists($middle) ) include $middle; ?>
      </div>

      <div class="bar">
	<p>&nbsp;</p>
      </div>

    </div>
