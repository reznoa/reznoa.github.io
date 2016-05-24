$(function(){
	$("#site-home .site-icon").hover(
		function() { $("#site-home .site-title").css("visibility", "visible"); },
		function() { $("#site-home .site-title").css("visibility", "hidden"); }
	);
});
