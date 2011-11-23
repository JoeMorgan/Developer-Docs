/*global alert: false, confirm: false, console: false, Debug: false */
"use strict";

// The purpose of this script is to demonstrate the use of prototypal inheritance, eschewing the pseudo-classical pattern completely
		
	// Utility functions
		// ES3 polyfill for Object.create()
		if (typeof Object.create !== 'function') {
		    Object.create = function(o){
		        function F(){}
		        F.prototype = o;
		        return new F();
		    };
		}

		// ES3 polyfill for Array.keys()
		if (typeof Object.keys !== 'function') {
			Object.keys = function(o){
				var result = [],
					name;
				for(name in o) {
					if(o.hasOwnProperty(name)){
						result.push(name);
					}
				}
				return result;
			};
		}
		
		// This function creates object constructors, handles inheritance, and initial method extension
		function new_constructor(extend, initializer, methods){
			var func,
				methodsArr,
				methodsLen,
				k,
				prototype = Object.create(extend && extend.prototype);	// ES5, but backup function provided above
			
			if(methods){
				methodsArr = Object.keys(methods);						// ES5, but backup function provided above
				methodsLen = methodsArr.length;
				for(k = methodsLen; k--;){
					prototype[methodsArr[k]] = methods[methodsArr[k]];	
				}
			}
			
			func = function(){		
				var that = Object.create(prototype);					// ES5, but backup function provided above
				if(typeof initializer === "function"){
					initializer.apply(that, arguments);
				}
				return that;
			};
			
			func.prototype = prototype;
			prototype.constructor = func;
			return func;
		}
	// END utility functions
	
	
	// Example usage
		// Define what a gizmo object will be, inheriting from Object
		var gizmo = new_constructor(
			Object,														// the object to inherit from
			function(id){												// the constructor function
				this.id = id;			
			},
			{															// object containing methods to add
				makeString: function(){
					return "gizmo " + this.id;
				}
			}
		);

		// Define what a hoozit object will be, inheriting from gizmo
		var hoozit = new_constructor(
			gizmo,														// the object to inherit from
			function(id, testArray){									// the constructor function
				this.id = id;
				this.testArray = testArray;			
			},
			{															// object containing methods to add
				testID: function(id){
					return this.id === id;
				}
			}
		);


		// Implementation and simple tests

		var thisGizmo = gizmo(0);										// create a gizmo with an id of 0
		var thatGizmo = gizmo("stringy");								// create a gizmo with an id of "stringy"
		
		var thisHoozit = hoozit(0, [0, 1, 2]);							// create a hoozit with an id of 0
		var thatHoozit = hoozit(1, [10, 9, 8]);							// create a hoozit with an id of 1
		
		console.log(thatGizmo.id);										// test to see if the id is set up properly
		console.log(thisGizmo.makeString());							// test the gizmo's makeString method
		console.log(thisHoozit.makeString());							// test the hoozit's inherited makeString method
		console.log(thatHoozit.testArray);								// check the hoozit's testArray

		thatHoozit.testArray = ["this", "that", "theOther"];			// Override the testArray on one of the hoozits
		
		console.log(thatHoozit.testArray);								// Test the overridden property for that hoozit
		console.log(thisHoozit.testArray);								// Test to ensure that it wasn't overridden on the other instance