/*global alert: false, confirm: false, console: false, Debug: false, head: false, $: false, jQuery: false, window: false */
// The preceding comment prevents JSLint from showing warnings about commonly used global variables

// Tells the browser to use ES5 strict mode, if supported; WARNING: MAKE SURE YOU UNDERSTAND THE IMPLICATIONS OF THIS BEFORE INCLUDING
"use strict";

define(
	["jquery"],
	function($){
		var theContainer = $(".main-container"),
			windowRef = $(window);

		/**
		 * Finds a content element based on the href attribute of the clicked link
		 * @param	{Object}	node	A reference to the clicked link (not a jQuery object)
		 * @return	{Object}			Returns a jQuery object reference to the target content element
		 */
		function findTarget(node){
			var theHref = node.href,
				hashLoc = theHref.indexOf("#") + 1,
				theHash = theHref.substr(hashLoc, theHref.length);
				
			return $("#" + theHash);
		}
		
		
		/**
		 * Scrolls to the target content element based on the href attribute of the clicked link
		 * @param	{Object}	node	A reference to the clicked link (not a jQuery object)
		 * @return	{Undefined}
		 */		
		function doScroll(node){
			var theElem = findTarget(node),
				elemOffset = theElem.offset(),
				elemTopOffset = elemOffset.top - 20;	
			$("html, body").animate(
				{
					scrollTop: elemTopOffset + "px"
				}, 
				1000,
				"easeInOutSine"
			);
		}

		// Side navigation functionality
		theContainer.delegate("nav a:not(.top-level), .jumper", "click", function(e){
			doScroll(this);
			return false;
		});	

	
		function fixNav(){
			var windowHeight	= windowRef.height(),
				nav				= theContainer.find("nav > ul"),
				navHeight		= nav.height();

			if(navHeight > windowHeight){
				nav.addClass("not-fixed");
			}else{
				nav.removeClass("not-fixed");
			}
		}
		fixNav();
		
		windowRef.bind("resize", fixNav);
	}
);

