/*!
 * My Script Files
 *
 * @since       1.0.0
 * @author      hellofromTonya
 * @link        https://hellofromtonya.com
 * @license     GPL-2+
 */
;(function( $, window, document, undefined ) {
	"use strict";

	$.fn.textWidth = function(text, font) {
		if ( ! $.fn.textWidth.fakeEl) {
			$.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
		}
		$.fn.textWidth.fakeEl.text(text || this.val() || this.text()).css('font', font || this.css('font'));

		return $.fn.textWidth.fakeEl.width();
	};
	
	var init = function() {
		var $adjectives = $('.about--adjective');
		if ( typeof $adjectives === "undefined") {
			return;
		}

		$adjectives.each( function(){
			setTextWidth( $(this) );
		});
	}

	function setTextWidth( $adjective ) {
		var width = $adjective.textWidth(),
			lineHeight = 0;
		
		if ( width > 60 ) {
			width *= 1.3;
			lineHeight = width - 10;
		} else if ( width > 30 ) {
			width *= 1.6;
			lineHeight = width - 20;
		} else {
			width *= 2;
			lineHeight = width - 30;
		}

		$adjective.css({
			width: width,
			height: width,
			lineHeight: lineHeight + 'px'
		}).show();
	}
	
	init();
	
}( jQuery, window, document ) );
;(function( $, window, document, undefined ) {
	"use strict";

	var $window,
		$body,
		$container;

	var init = function() {
		$window = $( window );
		$body = $('body');
		initMenu();
	}

	function initMenu() {
		$container = $('#menu-container');
		_setContainerWidth();

		$('#hamburger-menu--mobile').on('click', initClickHandler );
		$('#hamburger-menu').on('click', initClickHandler );

		$(window).resize(function() {
			_setContainerWidth();
		});
	}

	function _setContainerWidth() {
		if ( window.innerWidth < 768 ) {
			return;
		}

		$container.css('width', window.innerWidth - $('.sidebar--right').width());
	}

	function initClickHandler() {
		if ( $body.hasClass('menu--open') ) {
			closeContainer();

		} else {
			openContainer();
		}
	}

	function closeContainer() {

		$container.removeClass('slideInRight').addClass('slideOutLeft');

		setTimeout(function(){
			$body.removeClass('menu--open');
		}, 400);
	}

	function openContainer() {
		$body.addClass('menu--open');
		$container.addClass('slideInRight').removeClass('slideOutLeft');

		itemClickHandler();
	}

	function itemClickHandler() {
		$('.menu--item a').on('click', function(){
			closeContainer();
		});
	}

	init();

}( jQuery, window, document ) );
/**
 * Checks if the element is in the viewport (i.e. on the viewing screen)
 *
 * @since       1.0.0
 * @author      hellofromTonya
 * @link        https://hellofromtonya.com
 * @license     GPL-2.0+
 */

;(function ($, window, document, undefined) {

	'use strict';

	var $window = $( window );

	$.fn.isOnScreen = function( options ) {
		var $element = $( this ),
			defaults = {
				percentX: 1.0,
				percentY: 1.0
			};

		// Makes variables public
		$element.vars = $.extend({}, defaults, options);

		var limits = {},
			viewport = {},
			width = this.outerWidth(),
			height = this.outerHeight();


		// Private methods
		var methods = {
			init: function() {
				methods.initViewport();
				methods.initLimits();
				return methods.checkState();
			},

			initViewport: function() {
				viewport = {
					width: $window.width(),
					height: $window.height(),
					top: $window.scrollTop(),
					left: $window.scrollLeft()
				};

				viewport.bottom = viewport.top + viewport.height;
				viewport.right = viewport.left + viewport.width;
			},

			/**
			 * Initialize the element's limits, which
			 * are where this element is in the window.
			 */
			initLimits: function() {
				limits = $element.offset();

				limits.right = limits.left + width;
				limits.bottom = limits.top + height;
			},

			/**
			 * Let's check if the element is in the viewport, i.e.
			 * meaning it's on the viewing screen.
			 *
			 * @returns {bool}
			 */
			checkState: function() {
				var isOnScreen = !
					( viewport.right < limits.left || 
					  viewport.left > limits.right || 
					  viewport.bottom < limits.top || 
					  viewport.top > limits.bottom );

				if ( ! isOnScreen ) {
					return false;
				}

				return methods.isPartiallyOnScreen();
			},

			/**
			 * Let's check if the element is in the viewport, i.e.
			 * meaning it's on the viewing screen.
			 *
			 * @returns {bool}
			 */
			isPartiallyOnScreen: function() {
				return methods.xIsPartiallyOnScreen() &&
				       methods.yIsPartiallyOnScreen();
			},

			/**
			 * Checks if the element is partially on the screen for the y-axis
			 *
			 * @returns {boolean}
			 */
			xIsPartiallyOnScreen: function() {
				var actuals = {
						left : Math.min( 1, ( limits.right - viewport.left ) / width ),
						right : Math.min( 1, ( viewport.right - limits.left ) / width )
					},
					actualPercentX = actuals.left * actuals.right;

				return actualPercentX >= $element.vars.percentX;
			},

			/**
			 * Checks if the element is partially on the screen for the y-axis
			 *
			 * @returns {boolean}
			 */
			yIsPartiallyOnScreen: function() {
				var actuals = {
						top : Math.min( 1, ( limits.bottom - viewport.top ) / height ),
						bottom : Math.min( 1, ( viewport.bottom - limits.top ) / height )
					},
					actualPercentY = actuals.top * actuals.bottom;
				return actualPercentY >= $element.vars.percentY;
			}

		} // end of private methods

		return methods.init();

	} // end of object

})(jQuery, window, document);
;(function( $, window, document, undefined ) {
	"use strict";

	var lastPosition = 0,
		$backgroundText, currentSection = 0;

	var init = function() {
		if ( window.innerWidth < 768 ) {
			return;
		}

		$backgroundText = $('.background--text');
		if (typeof $backgroundText === "undefined") {
			return;
		}

		messageHandler();

		onScroll();
	}

	function onScroll() {

		$(window).scroll(function(){
			var currentPosition = $(this).scrollTop();

			if ( ! isMovementLargeEnough( currentPosition ) ) {
				return;
			}

			messageHandler();

			lastPosition = currentPosition;
		});
	}

	function isMovementLargeEnough( currentPosition ) {
		var movement = Math.abs( lastPosition - currentPosition );

		return movement > 50;
	}

	function messageHandler() {
		var $section = $('.section');
		console.log($section);

		$('.section').each(function(index){
			var $section = $(this);

			if ( ! $section.isOnScreen({percentY:0.3}) ) {
				return true;
			}

			if ( index == currentSection ) {
				return false;
			}
			setMessage($section);
			currentSection = index;
			return false;
		});
	}

	function setMessage( $section ) {
		var messageText = $section.data('message');

		if ( typeof messageText === "undefined" || messageText == null ) {
			return;
		}

		$backgroundText.html(messageText);
	}

	init();

	$(window).resize(function() {
		init();
	});

}( jQuery, window, document ) );
;(function( $, window, document, undefined ) {
	"use strict";
	var $sections = $('.section--fullwindow');

	var init = function() {
// 		_setHeight();
		_setContentWidth();

		$(window).resize(function() {
// 			_setHeight();
			_setContentWidth();
		});
	}

	function _setHeight() {
		if ( window.innerWidth < 768) {
			return;
		}
		$sections.each(function(){
			$(this).css( 'height', window.innerHeight );
		});
	}

	function _setContentWidth() {
		if ( window.innerWidth > 1200 || window.innerWidth < 768) {
			$('.site--content .wrap').css('max-width', '');
			return;
		}

		var wt = window.innerWidth - $('.sidebar--right').width() - $('.background--text').width();
		if (wt > 1400) {
			return;
		}
		$('.site--content .wrap').css('max-width', wt);
	}

	init();

}( jQuery, window, document ) );
;(function ( $, window, document, undefined ) {
	'use strict';

	var $scrollUp;

	var init = function() {
		$scrollUp = $('.scroll--up');

		_scrollupScrollHandler();
		$scrollUp.on('click', _scrollupClickHandler);
	}

	function _scrollupScrollHandler() {
		var height = $(window).height() / 2;

		$( window ).scroll( function () {
			var position =  $(this).scrollTop();

			if ( position > height ) {
				$scrollUp.addClass('slideInUp');
			} else {
				$scrollUp.removeClass('slideInUp');
			}
		} );
	}
	function _scrollupClickHandler() {

		$("html, body").animate({
			scrollTop: 0
		}, 2000);

		return false;
	}

	init();

}( jQuery, window, document ));
;(function() {
	console.log("Don't forget to be kind to someone today." );
})();
;(function ( $, window, document, undefined ) {
	'use strict'

	var $body;

	function init() {
		$body = $( 'html, body' );

		$( 'a[href^="#"]' ).on( 'click', function( event ) {
			event.preventDefault();

			smoothScrollHandler( this.hash, event );
		});
	}

	function smoothScrollHandler( target, event ) {
		var $target = $( target );

		if ( typeof $target == "undefined" || ! $target.length ) {
			return false;
		}

		$body.stop().animate({
			'scrollTop': $target.offset().top
		}, 2000, 'swing' );
	}

	init();

}( jQuery, window, document ));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9kaXN0LWRvY2Jsb2NrLmpzIiwianF1ZXJ5LmFkamVjdGl2ZXMuanMiLCJqcXVlcnkuZnVsbHBhZ2UtbmF2LmpzIiwianF1ZXJ5Lmlzb25zY3JlZW4uanMiLCJqcXVlcnkucGFnZS1iYWNrZ3JvdW5kLXRleHQuanMiLCJqcXVlcnkucGFnZS1zZXR1cC5qcyIsImpxdWVyeS5zY3JvbGwtdG8tdG9wLmpzIiwianF1ZXJ5LnNpZ25hdHVyZS5qcyIsImpxdWVyeS5zbW9vdGgtc2Nyb2xsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BDQTtBQUNBO0FBQ0E7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoianF1ZXJ5LnByb2plY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIE15IFNjcmlwdCBGaWxlc1xuICpcbiAqIEBzaW5jZSAgICAgICAxLjAuMFxuICogQGF1dGhvciAgICAgIGhlbGxvZnJvbVRvbnlhXG4gKiBAbGluayAgICAgICAgaHR0cHM6Ly9oZWxsb2Zyb210b255YS5jb21cbiAqIEBsaWNlbnNlICAgICBHUEwtMitcbiAqLyIsIjsoZnVuY3Rpb24oICQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCApIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0JC5mbi50ZXh0V2lkdGggPSBmdW5jdGlvbih0ZXh0LCBmb250KSB7XG5cdFx0aWYgKCAhICQuZm4udGV4dFdpZHRoLmZha2VFbCkge1xuXHRcdFx0JC5mbi50ZXh0V2lkdGguZmFrZUVsID0gJCgnPHNwYW4+JykuaGlkZSgpLmFwcGVuZFRvKGRvY3VtZW50LmJvZHkpO1xuXHRcdH1cblx0XHQkLmZuLnRleHRXaWR0aC5mYWtlRWwudGV4dCh0ZXh0IHx8IHRoaXMudmFsKCkgfHwgdGhpcy50ZXh0KCkpLmNzcygnZm9udCcsIGZvbnQgfHwgdGhpcy5jc3MoJ2ZvbnQnKSk7XG5cblx0XHRyZXR1cm4gJC5mbi50ZXh0V2lkdGguZmFrZUVsLndpZHRoKCk7XG5cdH07XG5cdFxuXHR2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xuXHRcdHZhciAkYWRqZWN0aXZlcyA9ICQoJy5hYm91dC0tYWRqZWN0aXZlJyk7XG5cdFx0aWYgKCB0eXBlb2YgJGFkamVjdGl2ZXMgPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQkYWRqZWN0aXZlcy5lYWNoKCBmdW5jdGlvbigpe1xuXHRcdFx0c2V0VGV4dFdpZHRoKCAkKHRoaXMpICk7XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBzZXRUZXh0V2lkdGgoICRhZGplY3RpdmUgKSB7XG5cdFx0dmFyIHdpZHRoID0gJGFkamVjdGl2ZS50ZXh0V2lkdGgoKSxcblx0XHRcdGxpbmVIZWlnaHQgPSAwO1xuXHRcdFxuXHRcdGlmICggd2lkdGggPiA2MCApIHtcblx0XHRcdHdpZHRoICo9IDEuMztcblx0XHRcdGxpbmVIZWlnaHQgPSB3aWR0aCAtIDEwO1xuXHRcdH0gZWxzZSBpZiAoIHdpZHRoID4gMzAgKSB7XG5cdFx0XHR3aWR0aCAqPSAxLjY7XG5cdFx0XHRsaW5lSGVpZ2h0ID0gd2lkdGggLSAyMDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0d2lkdGggKj0gMjtcblx0XHRcdGxpbmVIZWlnaHQgPSB3aWR0aCAtIDMwO1xuXHRcdH1cblxuXHRcdCRhZGplY3RpdmUuY3NzKHtcblx0XHRcdHdpZHRoOiB3aWR0aCxcblx0XHRcdGhlaWdodDogd2lkdGgsXG5cdFx0XHRsaW5lSGVpZ2h0OiBsaW5lSGVpZ2h0ICsgJ3B4J1xuXHRcdH0pLnNob3coKTtcblx0fVxuXHRcblx0aW5pdCgpO1xuXHRcbn0oIGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCApICk7IiwiOyhmdW5jdGlvbiggJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkICkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHR2YXIgJHdpbmRvdyxcblx0XHQkYm9keSxcblx0XHQkY29udGFpbmVyO1xuXG5cdHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XG5cdFx0JHdpbmRvdyA9ICQoIHdpbmRvdyApO1xuXHRcdCRib2R5ID0gJCgnYm9keScpO1xuXHRcdGluaXRNZW51KCk7XG5cdH1cblxuXHRmdW5jdGlvbiBpbml0TWVudSgpIHtcblx0XHQkY29udGFpbmVyID0gJCgnI21lbnUtY29udGFpbmVyJyk7XG5cdFx0X3NldENvbnRhaW5lcldpZHRoKCk7XG5cblx0XHQkKCcjaGFtYnVyZ2VyLW1lbnUtLW1vYmlsZScpLm9uKCdjbGljaycsIGluaXRDbGlja0hhbmRsZXIgKTtcblx0XHQkKCcjaGFtYnVyZ2VyLW1lbnUnKS5vbignY2xpY2snLCBpbml0Q2xpY2tIYW5kbGVyICk7XG5cblx0XHQkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xuXHRcdFx0X3NldENvbnRhaW5lcldpZHRoKCk7XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBfc2V0Q29udGFpbmVyV2lkdGgoKSB7XG5cdFx0aWYgKCB3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQkY29udGFpbmVyLmNzcygnd2lkdGgnLCB3aW5kb3cuaW5uZXJXaWR0aCAtICQoJy5zaWRlYmFyLS1yaWdodCcpLndpZHRoKCkpO1xuXHR9XG5cblx0ZnVuY3Rpb24gaW5pdENsaWNrSGFuZGxlcigpIHtcblx0XHRpZiAoICRib2R5Lmhhc0NsYXNzKCdtZW51LS1vcGVuJykgKSB7XG5cdFx0XHRjbG9zZUNvbnRhaW5lcigpO1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdG9wZW5Db250YWluZXIoKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBjbG9zZUNvbnRhaW5lcigpIHtcblxuXHRcdCRjb250YWluZXIucmVtb3ZlQ2xhc3MoJ3NsaWRlSW5SaWdodCcpLmFkZENsYXNzKCdzbGlkZU91dExlZnQnKTtcblxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdCRib2R5LnJlbW92ZUNsYXNzKCdtZW51LS1vcGVuJyk7XG5cdFx0fSwgNDAwKTtcblx0fVxuXG5cdGZ1bmN0aW9uIG9wZW5Db250YWluZXIoKSB7XG5cdFx0JGJvZHkuYWRkQ2xhc3MoJ21lbnUtLW9wZW4nKTtcblx0XHQkY29udGFpbmVyLmFkZENsYXNzKCdzbGlkZUluUmlnaHQnKS5yZW1vdmVDbGFzcygnc2xpZGVPdXRMZWZ0Jyk7XG5cblx0XHRpdGVtQ2xpY2tIYW5kbGVyKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBpdGVtQ2xpY2tIYW5kbGVyKCkge1xuXHRcdCQoJy5tZW51LS1pdGVtIGEnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdFx0Y2xvc2VDb250YWluZXIoKTtcblx0XHR9KTtcblx0fVxuXG5cdGluaXQoKTtcblxufSggalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50ICkgKTsiLCIvKipcbiAqIENoZWNrcyBpZiB0aGUgZWxlbWVudCBpcyBpbiB0aGUgdmlld3BvcnQgKGkuZS4gb24gdGhlIHZpZXdpbmcgc2NyZWVuKVxuICpcbiAqIEBzaW5jZSAgICAgICAxLjAuMFxuICogQGF1dGhvciAgICAgIGhlbGxvZnJvbVRvbnlhXG4gKiBAbGluayAgICAgICAgaHR0cHM6Ly9oZWxsb2Zyb210b255YS5jb21cbiAqIEBsaWNlbnNlICAgICBHUEwtMi4wK1xuICovXG5cbjsoZnVuY3Rpb24gKCQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCkge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgJHdpbmRvdyA9ICQoIHdpbmRvdyApO1xuXG5cdCQuZm4uaXNPblNjcmVlbiA9IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuXHRcdHZhciAkZWxlbWVudCA9ICQoIHRoaXMgKSxcblx0XHRcdGRlZmF1bHRzID0ge1xuXHRcdFx0XHRwZXJjZW50WDogMS4wLFxuXHRcdFx0XHRwZXJjZW50WTogMS4wXG5cdFx0XHR9O1xuXG5cdFx0Ly8gTWFrZXMgdmFyaWFibGVzIHB1YmxpY1xuXHRcdCRlbGVtZW50LnZhcnMgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG5cdFx0dmFyIGxpbWl0cyA9IHt9LFxuXHRcdFx0dmlld3BvcnQgPSB7fSxcblx0XHRcdHdpZHRoID0gdGhpcy5vdXRlcldpZHRoKCksXG5cdFx0XHRoZWlnaHQgPSB0aGlzLm91dGVySGVpZ2h0KCk7XG5cblxuXHRcdC8vIFByaXZhdGUgbWV0aG9kc1xuXHRcdHZhciBtZXRob2RzID0ge1xuXHRcdFx0aW5pdDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdG1ldGhvZHMuaW5pdFZpZXdwb3J0KCk7XG5cdFx0XHRcdG1ldGhvZHMuaW5pdExpbWl0cygpO1xuXHRcdFx0XHRyZXR1cm4gbWV0aG9kcy5jaGVja1N0YXRlKCk7XG5cdFx0XHR9LFxuXG5cdFx0XHRpbml0Vmlld3BvcnQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2aWV3cG9ydCA9IHtcblx0XHRcdFx0XHR3aWR0aDogJHdpbmRvdy53aWR0aCgpLFxuXHRcdFx0XHRcdGhlaWdodDogJHdpbmRvdy5oZWlnaHQoKSxcblx0XHRcdFx0XHR0b3A6ICR3aW5kb3cuc2Nyb2xsVG9wKCksXG5cdFx0XHRcdFx0bGVmdDogJHdpbmRvdy5zY3JvbGxMZWZ0KClcblx0XHRcdFx0fTtcblxuXHRcdFx0XHR2aWV3cG9ydC5ib3R0b20gPSB2aWV3cG9ydC50b3AgKyB2aWV3cG9ydC5oZWlnaHQ7XG5cdFx0XHRcdHZpZXdwb3J0LnJpZ2h0ID0gdmlld3BvcnQubGVmdCArIHZpZXdwb3J0LndpZHRoO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBJbml0aWFsaXplIHRoZSBlbGVtZW50J3MgbGltaXRzLCB3aGljaFxuXHRcdFx0ICogYXJlIHdoZXJlIHRoaXMgZWxlbWVudCBpcyBpbiB0aGUgd2luZG93LlxuXHRcdFx0ICovXG5cdFx0XHRpbml0TGltaXRzOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0bGltaXRzID0gJGVsZW1lbnQub2Zmc2V0KCk7XG5cblx0XHRcdFx0bGltaXRzLnJpZ2h0ID0gbGltaXRzLmxlZnQgKyB3aWR0aDtcblx0XHRcdFx0bGltaXRzLmJvdHRvbSA9IGxpbWl0cy50b3AgKyBoZWlnaHQ7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIExldCdzIGNoZWNrIGlmIHRoZSBlbGVtZW50IGlzIGluIHRoZSB2aWV3cG9ydCwgaS5lLlxuXHRcdFx0ICogbWVhbmluZyBpdCdzIG9uIHRoZSB2aWV3aW5nIHNjcmVlbi5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJucyB7Ym9vbH1cblx0XHRcdCAqL1xuXHRcdFx0Y2hlY2tTdGF0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBpc09uU2NyZWVuID0gIVxuXHRcdFx0XHRcdCggdmlld3BvcnQucmlnaHQgPCBsaW1pdHMubGVmdCB8fCBcblx0XHRcdFx0XHQgIHZpZXdwb3J0LmxlZnQgPiBsaW1pdHMucmlnaHQgfHwgXG5cdFx0XHRcdFx0ICB2aWV3cG9ydC5ib3R0b20gPCBsaW1pdHMudG9wIHx8IFxuXHRcdFx0XHRcdCAgdmlld3BvcnQudG9wID4gbGltaXRzLmJvdHRvbSApO1xuXG5cdFx0XHRcdGlmICggISBpc09uU2NyZWVuICkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBtZXRob2RzLmlzUGFydGlhbGx5T25TY3JlZW4oKTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogTGV0J3MgY2hlY2sgaWYgdGhlIGVsZW1lbnQgaXMgaW4gdGhlIHZpZXdwb3J0LCBpLmUuXG5cdFx0XHQgKiBtZWFuaW5nIGl0J3Mgb24gdGhlIHZpZXdpbmcgc2NyZWVuLlxuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm5zIHtib29sfVxuXHRcdFx0ICovXG5cdFx0XHRpc1BhcnRpYWxseU9uU2NyZWVuOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1ldGhvZHMueElzUGFydGlhbGx5T25TY3JlZW4oKSAmJlxuXHRcdFx0XHQgICAgICAgbWV0aG9kcy55SXNQYXJ0aWFsbHlPblNjcmVlbigpO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBDaGVja3MgaWYgdGhlIGVsZW1lbnQgaXMgcGFydGlhbGx5IG9uIHRoZSBzY3JlZW4gZm9yIHRoZSB5LWF4aXNcblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0XHRcdCAqL1xuXHRcdFx0eElzUGFydGlhbGx5T25TY3JlZW46IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgYWN0dWFscyA9IHtcblx0XHRcdFx0XHRcdGxlZnQgOiBNYXRoLm1pbiggMSwgKCBsaW1pdHMucmlnaHQgLSB2aWV3cG9ydC5sZWZ0ICkgLyB3aWR0aCApLFxuXHRcdFx0XHRcdFx0cmlnaHQgOiBNYXRoLm1pbiggMSwgKCB2aWV3cG9ydC5yaWdodCAtIGxpbWl0cy5sZWZ0ICkgLyB3aWR0aCApXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRhY3R1YWxQZXJjZW50WCA9IGFjdHVhbHMubGVmdCAqIGFjdHVhbHMucmlnaHQ7XG5cblx0XHRcdFx0cmV0dXJuIGFjdHVhbFBlcmNlbnRYID49ICRlbGVtZW50LnZhcnMucGVyY2VudFg7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIENoZWNrcyBpZiB0aGUgZWxlbWVudCBpcyBwYXJ0aWFsbHkgb24gdGhlIHNjcmVlbiBmb3IgdGhlIHktYXhpc1xuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHRcdFx0ICovXG5cdFx0XHR5SXNQYXJ0aWFsbHlPblNjcmVlbjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBhY3R1YWxzID0ge1xuXHRcdFx0XHRcdFx0dG9wIDogTWF0aC5taW4oIDEsICggbGltaXRzLmJvdHRvbSAtIHZpZXdwb3J0LnRvcCApIC8gaGVpZ2h0ICksXG5cdFx0XHRcdFx0XHRib3R0b20gOiBNYXRoLm1pbiggMSwgKCB2aWV3cG9ydC5ib3R0b20gLSBsaW1pdHMudG9wICkgLyBoZWlnaHQgKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0YWN0dWFsUGVyY2VudFkgPSBhY3R1YWxzLnRvcCAqIGFjdHVhbHMuYm90dG9tO1xuXHRcdFx0XHRyZXR1cm4gYWN0dWFsUGVyY2VudFkgPj0gJGVsZW1lbnQudmFycy5wZXJjZW50WTtcblx0XHRcdH1cblxuXHRcdH0gLy8gZW5kIG9mIHByaXZhdGUgbWV0aG9kc1xuXG5cdFx0cmV0dXJuIG1ldGhvZHMuaW5pdCgpO1xuXG5cdH0gLy8gZW5kIG9mIG9iamVjdFxuXG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQpOyIsIjsoZnVuY3Rpb24oICQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCApIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0dmFyIGxhc3RQb3NpdGlvbiA9IDAsXG5cdFx0JGJhY2tncm91bmRUZXh0LCBjdXJyZW50U2VjdGlvbiA9IDA7XG5cblx0dmFyIGluaXQgPSBmdW5jdGlvbigpIHtcblx0XHRpZiAoIHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4ICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdCRiYWNrZ3JvdW5kVGV4dCA9ICQoJy5iYWNrZ3JvdW5kLS10ZXh0Jyk7XG5cdFx0aWYgKHR5cGVvZiAkYmFja2dyb3VuZFRleHQgPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRtZXNzYWdlSGFuZGxlcigpO1xuXG5cdFx0b25TY3JvbGwoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xuXG5cdFx0JCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGN1cnJlbnRQb3NpdGlvbiA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XG5cblx0XHRcdGlmICggISBpc01vdmVtZW50TGFyZ2VFbm91Z2goIGN1cnJlbnRQb3NpdGlvbiApICkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdG1lc3NhZ2VIYW5kbGVyKCk7XG5cblx0XHRcdGxhc3RQb3NpdGlvbiA9IGN1cnJlbnRQb3NpdGlvbjtcblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGlzTW92ZW1lbnRMYXJnZUVub3VnaCggY3VycmVudFBvc2l0aW9uICkge1xuXHRcdHZhciBtb3ZlbWVudCA9IE1hdGguYWJzKCBsYXN0UG9zaXRpb24gLSBjdXJyZW50UG9zaXRpb24gKTtcblxuXHRcdHJldHVybiBtb3ZlbWVudCA+IDUwO1xuXHR9XG5cblx0ZnVuY3Rpb24gbWVzc2FnZUhhbmRsZXIoKSB7XG5cdFx0dmFyICRzZWN0aW9uID0gJCgnLnNlY3Rpb24nKTtcblx0XHRjb25zb2xlLmxvZygkc2VjdGlvbik7XG5cblx0XHQkKCcuc2VjdGlvbicpLmVhY2goZnVuY3Rpb24oaW5kZXgpe1xuXHRcdFx0dmFyICRzZWN0aW9uID0gJCh0aGlzKTtcblxuXHRcdFx0aWYgKCAhICRzZWN0aW9uLmlzT25TY3JlZW4oe3BlcmNlbnRZOjAuM30pICkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBpbmRleCA9PSBjdXJyZW50U2VjdGlvbiApIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0c2V0TWVzc2FnZSgkc2VjdGlvbik7XG5cdFx0XHRjdXJyZW50U2VjdGlvbiA9IGluZGV4O1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gc2V0TWVzc2FnZSggJHNlY3Rpb24gKSB7XG5cdFx0dmFyIG1lc3NhZ2VUZXh0ID0gJHNlY3Rpb24uZGF0YSgnbWVzc2FnZScpO1xuXG5cdFx0aWYgKCB0eXBlb2YgbWVzc2FnZVRleHQgPT09IFwidW5kZWZpbmVkXCIgfHwgbWVzc2FnZVRleHQgPT0gbnVsbCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQkYmFja2dyb3VuZFRleHQuaHRtbChtZXNzYWdlVGV4dCk7XG5cdH1cblxuXHRpbml0KCk7XG5cblx0JCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcblx0XHRpbml0KCk7XG5cdH0pO1xuXG59KCBqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQgKSApOyIsIjsoZnVuY3Rpb24oICQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCApIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdHZhciAkc2VjdGlvbnMgPSAkKCcuc2VjdGlvbi0tZnVsbHdpbmRvdycpO1xuXG5cdHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XG4vLyBcdFx0X3NldEhlaWdodCgpO1xuXHRcdF9zZXRDb250ZW50V2lkdGgoKTtcblxuXHRcdCQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XG4vLyBcdFx0XHRfc2V0SGVpZ2h0KCk7XG5cdFx0XHRfc2V0Q29udGVudFdpZHRoKCk7XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBfc2V0SGVpZ2h0KCkge1xuXHRcdGlmICggd2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0JHNlY3Rpb25zLmVhY2goZnVuY3Rpb24oKXtcblx0XHRcdCQodGhpcykuY3NzKCAnaGVpZ2h0Jywgd2luZG93LmlubmVySGVpZ2h0ICk7XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBfc2V0Q29udGVudFdpZHRoKCkge1xuXHRcdGlmICggd2luZG93LmlubmVyV2lkdGggPiAxMjAwIHx8IHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG5cdFx0XHQkKCcuc2l0ZS0tY29udGVudCAud3JhcCcpLmNzcygnbWF4LXdpZHRoJywgJycpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHZhciB3dCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gJCgnLnNpZGViYXItLXJpZ2h0Jykud2lkdGgoKSAtICQoJy5iYWNrZ3JvdW5kLS10ZXh0Jykud2lkdGgoKTtcblx0XHRpZiAod3QgPiAxNDAwKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdCQoJy5zaXRlLS1jb250ZW50IC53cmFwJykuY3NzKCdtYXgtd2lkdGgnLCB3dCk7XG5cdH1cblxuXHRpbml0KCk7XG5cbn0oIGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCApICk7IiwiOyhmdW5jdGlvbiAoICQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCApIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciAkc2Nyb2xsVXA7XG5cblx0dmFyIGluaXQgPSBmdW5jdGlvbigpIHtcblx0XHQkc2Nyb2xsVXAgPSAkKCcuc2Nyb2xsLS11cCcpO1xuXG5cdFx0X3Njcm9sbHVwU2Nyb2xsSGFuZGxlcigpO1xuXHRcdCRzY3JvbGxVcC5vbignY2xpY2snLCBfc2Nyb2xsdXBDbGlja0hhbmRsZXIpO1xuXHR9XG5cblx0ZnVuY3Rpb24gX3Njcm9sbHVwU2Nyb2xsSGFuZGxlcigpIHtcblx0XHR2YXIgaGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpIC8gMjtcblxuXHRcdCQoIHdpbmRvdyApLnNjcm9sbCggZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIHBvc2l0aW9uID0gICQodGhpcykuc2Nyb2xsVG9wKCk7XG5cblx0XHRcdGlmICggcG9zaXRpb24gPiBoZWlnaHQgKSB7XG5cdFx0XHRcdCRzY3JvbGxVcC5hZGRDbGFzcygnc2xpZGVJblVwJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkc2Nyb2xsVXAucmVtb3ZlQ2xhc3MoJ3NsaWRlSW5VcCcpO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fVxuXHRmdW5jdGlvbiBfc2Nyb2xsdXBDbGlja0hhbmRsZXIoKSB7XG5cblx0XHQkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHtcblx0XHRcdHNjcm9sbFRvcDogMFxuXHRcdH0sIDIwMDApO1xuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0aW5pdCgpO1xuXG59KCBqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQgKSk7IiwiOyhmdW5jdGlvbigpIHtcblx0Y29uc29sZS5sb2coXCJEb24ndCBmb3JnZXQgdG8gYmUga2luZCB0byBzb21lb25lIHRvZGF5LlwiICk7XG59KSgpOyIsIjsoZnVuY3Rpb24gKCAkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQgKSB7XG5cdCd1c2Ugc3RyaWN0J1xuXG5cdHZhciAkYm9keTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdCRib2R5ID0gJCggJ2h0bWwsIGJvZHknICk7XG5cblx0XHQkKCAnYVtocmVmXj1cIiNcIl0nICkub24oICdjbGljaycsIGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdHNtb290aFNjcm9sbEhhbmRsZXIoIHRoaXMuaGFzaCwgZXZlbnQgKTtcblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHNtb290aFNjcm9sbEhhbmRsZXIoIHRhcmdldCwgZXZlbnQgKSB7XG5cdFx0dmFyICR0YXJnZXQgPSAkKCB0YXJnZXQgKTtcblxuXHRcdGlmICggdHlwZW9mICR0YXJnZXQgPT0gXCJ1bmRlZmluZWRcIiB8fCAhICR0YXJnZXQubGVuZ3RoICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdCRib2R5LnN0b3AoKS5hbmltYXRlKHtcblx0XHRcdCdzY3JvbGxUb3AnOiAkdGFyZ2V0Lm9mZnNldCgpLnRvcFxuXHRcdH0sIDIwMDAsICdzd2luZycgKTtcblx0fVxuXG5cdGluaXQoKTtcblxufSggalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50ICkpOyJdfQ==
