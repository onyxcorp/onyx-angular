(function($) {
	"use strict";

	/* ------------------------------------------------------------------------ */
	/*	BOOTSTRAP FIX FOR WINPHONE 8 AND IE10
	/* ------------------------------------------------------------------------ */
	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
		var msViewportStyle = document.createElement("style")
		msViewportStyle.appendChild(
			document.createTextNode(
				"@-ms-viewport{width:auto!important}"
			)
		)
		document.getElementsByTagName("head")[0].appendChild(msViewportStyle)
	}

	function detectIE() {
		if ($.browser.msie && $.browser.version == 9) {
			return true;
		}
		if ($.browser.msie && $.browser.version == 8) {
			return true;
		}
		return false;
	}

	function getWindowWidth() {
		return Math.max( $(window).width(), window.innerWidth);
	}

	function getWindowHeight() {
		return Math.max( $(window).height(), window.innerHeight);
	}


	//BEGIN DOCUMENT.READY FUNCTION
	jQuery(document).ready(function($) {

		$.browser.chrome = $.browser.webkit && !!window.chrome;
		$.browser.safari = $.browser.webkit && !window.chrome;

		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			$('body').addClass('mobile');
		}

		if ($.browser.chrome) {
			$('body').addClass('chrome');
		}

		if ($.browser.safari) {
			$('body').addClass('safari');
		}

        $('body').addClass('video-background');
        $('body').addClass('youtube-background')


        /* ------------------------------------------------------------------------ */
		/*	NICE SCROLL
		/* ------------------------------------------------------------------------ */
		$("body").niceScroll({
			cursorcolor: '#fff',
			cursoropacitymin: '0',
			cursoropacitymax: '1',
			cursorwidth: '3px',
			zindex: 10000,
			horizrailenabled: false,
			enablekeyboard: false
		});


		/* ------------------------------------------------------------------------ */
		/*	ANIMATED ELEMENTS
		/* ------------------------------------------------------------------------ */
		if( !$('body').hasClass('mobile') ) {

			if( detectIE() ) {
				$('.animated').css({
					'display':'block',
					'visibility': 'visible'
				});
			} else {
				/* Starting Animation on Load */
				$(window).load(function() {
					$('.onstart').each( function() {
						var elem = $(this);
						if ( !elem.hasClass('visible') ) {
							var animationDelay = elem.data('animation-delay');
							var animation = elem.data('animation');
							if ( animationDelay ) {
								setTimeout(function(){
									elem.addClass( animation + " visible" );
								}, animationDelay);
							} else {
								elem.addClass( animation + " visible" );
							}
						}
					});
				});
			}
		}


		/* ------------------------------------------------------------------------ */
		/*	PAGE
		/* ------------------------------------------------------------------------ */
		function setSectionHeight() {
			var navigationHeight = $(".site-nav").height();
			var section = $('section');
			var windowHeight = getWindowHeight();

			if ( section.hasClass('fullscreen') ) {
				$('section.fullscreen').css( 'min-height', windowHeight );
			}
		}

		function setPageWidth() {
			var pageWidth = $('body').width();

			$('.page-container').css('width', pageWidth);
		}

		setSectionHeight();
		setPageWidth();

		$(window).on('resize', function () {
			setSectionHeight();
			setPageWidth();
		});


		/* ------------------------------------------------------------------------ */
		/*	BACKGROUNDS
		/* ------------------------------------------------------------------------ */
		function initPageBackground() {
			if( $('body').hasClass('slideshow-background') ) { // SLIDESHOW BACKGROUND

				$("body").backstretch([
					"http://placehold.it/1920x1200",
					"http://placehold.it/1920x1200",
					"http://placehold.it/1920x1200",
				], {duration: 3000, fade: 1200});

			} else if($('body').hasClass('image-background')) { // IMAGE BACKGROUND

				$("body").backstretch([
					"http://placehold.it/1920x1200"
				]);

			} else if($('body').hasClass('parallax-background')) { // PARALLAX BACKGROUND

				$.parallaxify({
					positionProperty: 'transform',
					responsive: true,
					motionType: 'natural',
					mouseMotionType: 'performance',
					motionAngleX: 70,
					motionAngleY: 70,
					alphaFilter: 0.5,
					adjustBasePosition: true,
					alphaPosition: 0.025,
				});

			} else if($('body').hasClass('youtube-background')) { // YOUTUBE VIDEO BACKGROUND

				$(".player").each(function() {
					$(".player").mb_YTPlayer();
				});

			} else if($('body').hasClass('mobile')) { // MOBILE BACKGROUND - Image background instead of video on mobile devices
				if($('body').hasClass('video-background')) {

					// Default background on mobile devices
					$("body").backstretch([
						"http://placehold.it/1920x1200"
					]);

				}
			}
		}

		initPageBackground();


		/* ------------------------------------------------------------------------ */
		/*	IOS
		/* ------------------------------------------------------------------------ */
		function iosdetect() {
			var deviceAgent = navigator.userAgent.toLowerCase();
			var $iOS = deviceAgent.match(/(iphone|ipod|ipad)/);

			if ($iOS) {
				var divs = $('#home');
				var vid = $('#video_background');
				var h = window.innerHeight;
				var divh = $("#home").height();
				divs.css({ "position": "relative", "top": (h-divh)/2, "margin-top": "0" });
				vid.css({ "display": "none"});
				$(window).resize(function() {
					var divs = $('#home');
					var h = window.innerHeight;
					var divh = $("#home").height();
					divs.css({ "position": "relative", "top": (h-divh)/2, "margin-top": "0" });
				});

				// use fancy CSS3 for hardware acceleration
			}
		}

		iosdetect();


		/* ------------------------------------------------------------------------ */
		/*	NAVIGATION
		/* ------------------------------------------------------------------------ */
		$('.nav-toggle').click(function(){
			var navToggle = $('.nav-toggle');
			var navigation = $('.site-nav');

			navToggle.toggleClass('active');
			navigation.toggleClass('active');
		});


		/* ------------------------------------------------------------------------ */
		/*	MY COROUSEL
		/* ------------------------------------------------------------------------ */
		$("#my-carousel").owlCarousel({
			singleItem: true,

			//Basic Speeds
			slideSpeed : 700,
			paginationSpeed : 700,
			rewindSpeed : 700,

			lazyEffect:	'fade',

			// Navigation
			navigation : false,

			//Pagination
			pagination : false,
			paginationNumbers: false,

			//Auto height
			autoHeight : false,

			mouseDrag: false,
			touchDrag: false,

			addClassActive: true,

		});

		var appTour = $(".owl-carousel").data('owlCarousel');

		$('.site-nav a').click(function(){
			var elem = $(this);
			var goToSlide = elem.data('slide') - 1;
			$('.site-nav a').removeClass('active');
			elem.addClass('active');

			appTour.goTo(goToSlide);

			if( !$('body').hasClass('mobile') ) {
				if( detectIE() ) {
					$('.animated').css({
						'display':'block',
						'visibility': 'visible'
					});
				} else {
					if($('.owl-item').hasClass('active')) {
						setTimeout(function(){
							$('.owl-item .animated').each( function() {
								var elem = $(this);
								var animation = elem.data('animation');
								elem.removeClass( animation + " visible" );
							});
						}, 700);
						$('.active').find('.animated').each( function() {
							var elem = $(this);
							var animation = elem.data('animation');
							if ( !elem.hasClass('visible') ) {
								var animationDelay = elem.data('animation-delay');
								if ( animationDelay ) {
									setTimeout(function(){
										elem.addClass( animation + " visible" );
									}, animationDelay);
								} else {
									elem.addClass( animation + " visible" );
								}
							}
						});
					}
				}
			}
		});

		$('a.go-slide').click(function(){
			var elem = $(this);
			var goToSlide = elem.data('slide') - 1;
			var navSlideNumber = elem.data('slide');

			$('.site-nav a').removeClass('active');
			if ($('.site-nav a[data-slide='+ navSlideNumber +']')) {
				$('.site-nav a[data-slide='+ navSlideNumber +']').addClass('active');
			}

			appTour.goTo(goToSlide);

			if( !$('body').hasClass('mobile') ) {
				if( detectIE() ) {
					$('.animated').css({
						'display':'block',
						'visibility': 'visible'
					});
				} else {
					if($('.owl-item').hasClass('active')) {
						setTimeout(function(){
							$('.owl-item .animated').each( function() {
								var elem = $(this);
								var animation = elem.data('animation');
								elem.removeClass( animation + " visible" );
							});
						}, 600);
						$('.active').find('.animated').each( function() {
							var elem = $(this);
							var animation = elem.data('animation');
							if ( !elem.hasClass('visible') ) {
								var animationDelay = elem.data('animation-delay');
								if ( animationDelay ) {
									setTimeout(function(){
										elem.addClass( animation + " visible" );
									}, animationDelay);
								} else {
									elem.addClass( animation + " visible" );
								}
							}
						});
					}
				}
			}

		});

		$(document).keydown(function(e) {
			if(e.keyCode == 37 || e.keyCode == 40) { // left
				appTour.prev();

				var currentSlide = $('div.active').index() + 1;
				$('.site-nav a').removeClass('active');
				$('[data-slide='+ currentSlide +']').addClass('active');

				if( !$('body').hasClass('mobile') ) {
					if( detectIE() ) {
						$('.animated').css({
							'display':'block',
							'visibility': 'visible'
						});
					} else {
						if($('.owl-item').hasClass('active')) {
							setTimeout(function(){
								$('.owl-item .animated').each( function() {
									var elem = $(this);
									var animation = elem.data('animation');
									elem.removeClass( animation + " visible" );
								});
							}, 600);
							$('.active').find('.animated').each( function() {
								var elem = $(this);
								var animation = elem.data('animation');
								if ( !elem.hasClass('visible') ) {
									var animationDelay = elem.data('animation-delay');
									if ( animationDelay ) {
										setTimeout(function(){
											elem.addClass( animation + " visible" );
										}, animationDelay);
									} else {
										elem.addClass( animation + " visible" );
									}
								}
							});
						}
					}
				}
			}
			else if(e.keyCode == 39 || e.keyCode == 38) { // right
				appTour.next();

				var currentSlide = $('div.active').index() + 1;
				$('.site-nav a').removeClass('active');
				$('[data-slide='+ currentSlide +']').addClass('active');
				if( !$('body').hasClass('mobile') ) {
					if( detectIE() ) {
						$('.animated').css({
							'display':'block',
							'visibility': 'visible'
						});
					} else {
						if($('.owl-item').hasClass('active')) {
							setTimeout(function(){
								$('.owl-item .animated').each( function() {
									var elem = $(this);
									var animation = elem.data('animation');
									elem.removeClass( animation + " visible" );
								});
							}, 600);
							$('.active').find('.animated').each( function() {
								var elem = $(this);
								var animation = elem.data('animation');
								if ( !elem.hasClass('visible') ) {
									var animationDelay = elem.data('animation-delay');
									if ( animationDelay ) {
										setTimeout(function(){
											elem.addClass( animation + " visible" );
										}, animationDelay);
									} else {
										elem.addClass( animation + " visible" );
									}
								}
							});
						}
					}
				}
			}
		});


		/* ------------------------------------------------------------------------ */
		/*	RESPONSIVE VIDEO - FITVIDS
		/* ------------------------------------------------------------------------ */
		$(".video-container").fitVids();


		/* ------------------------------------------------------------------------ */
		/*	COUNTDOWN
		/* ------------------------------------------------------------------------ */
		if($.find('#counter')[0]) {
			$('#counter').countdown('2014/12/06 12:00:00').on('update.countdown', function(event) {
				var $this = $(this).html(event.strftime(''
					+ '<div class="counter-container"><div class="counter-box first"><div class="number">%-D</div><span>Day%!d<span></div>'
					+ '<div class="counter-box"><div class="number">%H</div><span>Hours</span></div>'
					+ '<div class="counter-box"><div class="number">%M</div><span>Minutes</span></div>'
					+ '<div class="counter-box last"><div class="number">%S</div><span>Seconds</span></div></div>'
				));
			});
		};



		/* ------------------------------------------------------------------------ */
		/*	PLACEHOLDER
		/* ------------------------------------------------------------------------ */
		$('input, textarea').placeholder();


	});
	//END DOCUMENT.READY FUNCTION

})(jQuery);