$(function() {
	$('header a').bind('click',function(event){
		var target = $($(this).attr('href'))
		var y = target.offset().top + (target.height() / 2 ) - ($(window).height() / 2 ) - 60;

		$('html, body').stop().animate({ scrollTop: y }, 1000, 'easeInOutExpo' );
		/*
		if you don't want to use the easing effects:
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1000);
		*/
		event.preventDefault();
	});
});

var $el, leftPos, newWidth,
	$mainNav = $("#access ul");

$mainNav.append("<li id='magic-line'></li>");
var $magicLine = $("#magic-line");

$magicLine
	.width($("li.active").width())
	.css("left", $(".active a").position().left)
	.data("origLeft", $magicLine.position().left)
	.data("origWidth", $magicLine.width());

$("#access ul li a").hover(function() {
	console.log('hover')
	$el = $(this);
	leftPos = $el.position().left;
	newWidth = $el.parent().width();
	$magicLine.stop().animate({
		left: leftPos,
		width: newWidth
	});
}, function() {
	$magicLine.stop().animate({
		left: $magicLine.data("origLeft"),
		width: $magicLine.data("origWidth")
	});
});
