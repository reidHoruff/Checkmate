#Checkmate
Checkmate is a flexible jQuery plugin for user input validation with qtip integration.

##Setup
Just include jQuery 1.5+ (tested) and checkmate.js

##Validating a Single Text Input

	//returns true or false depending on weather the regex is satisfied
	$("#first-name").checkmate({
		match: /^[a-zA-Z]{2,}$/,
	}).checkmate('validate');
	
##Validating all Checkmate Objects on Page

	$("#first-name").checkmate({
		match: /^[a-zA-Z]{2,}$/,
	});
	
	$("#last-name").checkmate({
		match: /^[a-zA-Z]{2,}$/,
	});
	
	//validates both first-name and last-name inputs
	//also returns a boolean representign weather or not all checkmate objects were satisfied
	$().checkmate('validate');
	
##Validating a Set of Checkmate Objects
	$("#first-name").checkmate({
		match: /^[a-zA-Z]{2,}$/,
	});
	
	$("#last-name").checkmate({
		match: /^[a-zA-Z]{2,}$/,
	});
	
	$("#email").checkmate({
		match: /^\w+@\w+\.\w{2,4}$/,
	});
	
	//only validates first-name and last-name fields
	$().checkmate('validate', [$("#first-name"), $("#last-name")] );
	
##Callback Methods
All callbacks are called with one argument, a boolean value representing whether or not the input matches the regex. All callbacks are called in the context of the checkmate jQuery object, 'this' will refer to $(this).

	$("#first-name").checkmate({
		match: /^[a-zA-Z]{2,}$/,
		
		//called whenever is validated from an outside state, ex: $().checkmate('validate');
		validate: function(match){
			console.log("validated " + match);
		},
		
		//called whenever a keypress is made in 'first-name'.
		//match will be represenative of weather the current text matches the regex.
		//this does not invoke the validate callback.
		keypress: function(match){
			console.log("key pressed " + match);
		},
		
		//called whenever 'first-name' looses focus
		focusout: function(match){
			console.log("focusout " + match);
		},
		
		//called WHENEVER an action occurrs to 'first-name' or the 'first-name' checkmate object
		onaction: function(match){
			console.log("action " + match);
		}
	});
	
##Submit Listener
	$("#email").checkmate({
		match: /^\w+@\w+\.\w{2,4}$/,
		
		//'email' will be validated whenever 'submit-button' is pressed.
		//validate and onevent call backs will be called if present
		submit: $("#submit-button")
	});
	
##Master Input

	$("#password").checkmate({
		match: /^\w{6,}$/,
	});
	
	//'verify-passord' will be considerd valid if it is equal to 'password' or 'password' is invalid
	$("#verify-password").checkmate({
		master: $("#password")
	});
	
##Optional Input
	
	//'favorite-color' is valid if it either matches the regex or it is empty
	$("#favorite-color").checkmate({
		match: /^[a-zA-Z]+$/,
		require: false
	});
	
##Custom Validation Logic
	$("#first-name").checkmate({
		
		isvalid: function(){
			//only valid on Thursdays
			return new Date().getDay() == 4;
		}
	});
	
##Silent Validation

	$("#first-name").checkmate({
		match: /^[a-zA-Z]{2,}$/,
	});
	
	$("#last-name").checkmate({
		match: /^[a-zA-Z]{2,}$/,
	});
	
	//similar to $().checkmate('validate') except callbacks are not invoked, with the exception of onaction
	$().checkmate('isvalid');
	
##Shared Settings
	var common = {
		require: false,
		
		validate: function(valid){
			console.log(this.attr('id') + '=' + valid);
		}
	}
	
	$("#name").checkmate($.extend({}, common, {
		match: /^[a-zA-Z]{2,}$/,
	}));
	
	$("#email").checkmate($.extend({}, common, {
		match: /^\w+@\w+\.\w{2,4}$/,
	}));
	
##Qtip 2.0+ Integration
It might seem sloppy to have another extension sort of half integrated. But checkmate started around the idea of having qtip boxes popup around user inputs. All checkmate does is hide/show qtip objects already defined and attached to the same object that a checkmate object to atteched to.


####Create Qtip

	$("#name").qtip({
		content: 'Name is Invalid',
		
		position: {
			my: 'center left',	
			at: 'center right',
		},
		
		show: false,
		hide: false,
		
		style:{
			tip: true,
			classes: 'ui-tooltip-dark'
		}
	});

####Create Chackmate

	$("#name").checkmate({
		match: /^[a-zA-Z]{2,}$/,
		
		qtip: {
			validate: true,
		}
	});
	
The created Qtip will now appear whenever 'name' passes a validation and will dissapear whenever 'name' fails a validation.
	
####Qtip options

	qtip:{
		validate: true, //show/hide on validation
		keypress: true, //show/hide on keypress
		focusout: true, //show/hide whenever focus is lost
		invert: true    //inverts the show/hide behavior
	}
