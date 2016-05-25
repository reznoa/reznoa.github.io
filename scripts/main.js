$(function(){
	$("#site-home .site-icon").hover(
		function() {
			$("#site-home .site-title").css("visibility", "visible");
			$("#site-nav ul li a").css("opacity", "0.5");
		},
		function() {
			$("#site-home .site-title").css("visibility", "hidden");
			$("#site-nav ul li a").css("opacity", "1");
		}
	);
});
