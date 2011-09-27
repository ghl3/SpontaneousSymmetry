


$(document).ready(function(){
    
    // Validate
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
		required: "Enter the linear term.",
		number: "Input must be a number"
	    },
	    quadc: {
		required: "Enter the constant term.",
		number: "Input must be a number"
	    }

	},


	submitHandler: function(form) {
	    $.post('submit.php', $("#QuadraticForm").serialize(), function(data) {
		    <!-- Send the html results to the #results field -->
		    $('#results').html(data);
	    });
	}
    });
});

