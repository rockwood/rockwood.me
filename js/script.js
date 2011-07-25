$(function () {

	var magicArrow;

	function setActiveSection(sectionId) {
		
		$('section').removeClass('active');
		$('section#' + sectionId).addClass('active');

		$('#access li').removeClass('active');
		$('#access li#nav-' + sectionId).addClass('active');
		
		magicArrow.animateTo($('#access #nav-' + sectionId + ' a'));

	}

	$("#access ul").append('<li id="magic-arrow" style="width: 100%"></li>');

	magicArrow = {
		
		el: $("#magic-arrow"),
		
		locked: false, 

		lock: function () {
			this.locked = true;
			console.log('locked');
		},
		
		unLock: function () {
			this.locked = false;
			console.log('unlocked');
		},

		animateTo: function (target) {

			if (this.locked) { 
				return; 
			}

			var leftPos = target.position().left;
			var newWidth = target.parent().width();

			this.el.stop().animate({ left: leftPos, width: newWidth });

		}

	};

	setActiveSection('title');

	$("#access ul li a").hover(

		function () {

			magicArrow.unLock();
			magicArrow.animateTo($(this));
			
		}, 

		function () {

			magicArrow.animateTo($('#access li.active a'));

		}
	);

	$('#access a').click(function (event) {

		var target = $($(this).attr('href'));
		var viewport = $(window);
		var y;

		//if the height of the viewport exceeds the target's height, then we scroll so the target is centered in the viewport. Otherwise we scroll to the top of the target.
		if( target.height() > viewport.height() ){
			
			console.log('yep')
			y = target.offset().top - 130;
			console.log(y)
		}else{
			console.log('nope')
			y = target.offset().top + (target.height() / 2) - (viewport.height() / 2) - 60;
			
		}

		
		magicArrow.lock();

		$('body, html').stop().animate({ scrollTop: y }, 1000, 'easeInOutExpo', function () {
			magicArrow.unLock();
		});

		event.preventDefault();

	});


	$('section').appear(function () {

		setActiveSection($(this).attr('id'));

	}, {one: false});

});
