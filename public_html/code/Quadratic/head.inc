

    <!--
    <script type="text/javascript" src="<?php echo $HOME_DIR ?>../jquery/jquery.js"></script>
    <script type="text/javascript" src="<?php echo $HOME_DIR ?>../jquery/functions/CodeVisualization.js"></script>
    <script type="text/javascript" src="http://ajax.microsoft.com/ajax/jquery.validate/1.7/jquery.validate.min.js"></script>               
    -->
    <script type="text/javascript" src="<?php echo $HOME_DIR ?>jquery/jquery.js"></script>
    <script type="text/javascript" src="<?php echo $HOME_DIR ?>jquery/functions/CodeVisualization.js"></script>
    <script type="text/javascript" src="<?php echo $HOME_DIR ?>jquery/jquery.validate.min.js"></script>

    <!-- Define the Validation / Submit Script -->
    <script type="text/javascript">
    $(document).ready(function(){
	
	    <!-- Validate -->
	    $("#QuadraticForm").validate({
		debug: false,
		rules: {
		    quada: {
			required: true,
			number: true
		    },
		    quadb: {
			required: true,
			number: true
		    },
		    quadc: {
			required: true,
			number: true
		    }
		},
		messages: {
		    quada: {
			required: "Enter the quadratic term.",
			number: "Input must be a number"
		    },
		    quadb: {
			required: "Enter the quadratic term.",
			number: "Input must be a number"
		    },
		    quadc: {
			required: "Enter the quadratic term.",
			number: "Input must be a number"
		    }

		},

		    <!-- Submit -->
		    submitHandler: function(form) {
			$.post('submit.php', $("#QuadraticForm").serialize(), function(data) {
				<!-- Send the html results to the #results field -->
				$('#results').html(data);
			});
		    }
	    });
    });
</script>                              

