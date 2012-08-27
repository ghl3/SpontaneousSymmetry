

$(document).ready(function() {

    $('div#Introduction').hide();
    $('div#Results').hide();

    // Show/Hide Introduction
    $("#IntroductionButton").click(function(){
	$("div#Introduction").toggle("fast");
    });

    // Show/Hide Results
    $("#ResultsButton").click(function(){
	$("div#Results").toggle("fast");
    });

});
