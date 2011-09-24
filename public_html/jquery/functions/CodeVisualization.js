


// Javascript Functions


// Just a test:

$(document).ready(function(){
    $("button#W3").click(function(){
	$("p#W3").html("W3Schools", 1000);
    });
});

$(document).ready(function(){
    $("button#yellow").click(function(){
	$("p#yellow").css("background-color","yellow");
    });
});

// Show and hide code:

$(document).ready(function() {
    $('div#showcode').hide();
});

$(document).ready(function(){
    $("button#showcodebutton").click(function(){
	$("div#showcode").toggle("fast");
    });
});



$(document).ready(function(){
    $("button").click(function(){
	$("div").load('test1.txt');
    });
});

$(document).ready(function(){
    $("button").click(function(){
	$("#test").hide();
    });
});

