$(function() {
	
	app = {};

	$("#access ul").append('<li id="magic-arrow" style="width: 100%"></li>');

	magicArrow = {
		
		el: $("#magic-arrow"),
		
		locked: false, 

		lock: function(){
			this.locked = true;

		},
		
		unLock: function(){
			this.locked = false;
			console.log('test')
		},

		animateTo: function(target){

			if (this.locked) return;

			var leftPos = target.position().left;
			var newWidth = target.parent().width();

			this.el.stop().animate({
				left: leftPos,
				width: newWidth
			});

		}

	}

	setActiveSection('title')

	$("#access ul li a").hover(function() {

		magicArrow.unLock();
		magicArrow.animateTo($(this)) 
		
	}, function() {

		magicArrow.animateTo($('#access li.active a')) 

	});

	$('#access a').click(function(event){
		var target = $($(this).attr('href'))
		var y = target.offset().top + (target.height() / 2 ) - ($(window).height() / 2 ) - 60;

		magicArrow.lock();

		$('body').stop().animate({ scrollTop: y }, 1000, 'easeInOutExpo', function(){
			magicArrow.unLock();
		});

		event.preventDefault();
	});


	$('section').appear(function() {

		setActiveSection($(this).attr('id'))
	  	
	}, {one: false});


	function setActiveSection(sectionId){
		
		$('section').removeClass('active')
		$('section#' + sectionId).addClass('active')

		$('#access li').removeClass('active')
		$('#access li#nav-' + sectionId ).addClass('active')
		
		magicArrow.animateTo($('#access #nav-' + sectionId + ' a'))

	}

	

});
