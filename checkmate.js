(function( $ ){
	
	$.checkmate = function(element, args){
		var $this = $(element);
		var plugin = this;
		
		var default_settings = {
			require: true,
			
			qtip: {
				submit: false,
				keyup: false,
				keypress: false,
				validate: false,
				invert: false
			}
		}
		
		plugin.settings = {};
		
		plugin.init = function(){
			plugin.settings = $.extend({}, default_settings, args);
			
			if(!plugin.settings.match && !plugin.settings.master){
				$.error('No pattern or master defined');
			}
			
			/* if linked to submit to button */
			if(plugin.settings.submit){
				plugin.settings.submit.click(function(){
					/* validate on call back */
					plugin.validate.call($this);
				});
			}
			
			/* key press listener */
			$this.keyup(function(){
				var valid = plugin.is_valid();
				
				/* invoke callback */
				if(plugin.settings.keypress){
					plugin.settings.keypress.call( $this, valid );
				}
				
				/* qtip */
				if(plugin.settings.qtip.keyup){
					$this.qtip((valid^plugin.settings.qtip.invert)?'hide':'show');
				}
			});
			
			/* focus out listener */
			$this.focusout(function(){
				var valid = plugin.is_valid();
				
				/* invoke callback */
				if(plugin.settings.focusout){
					plugin.settings.focusout.call( $this, valid );
				}
				
				/* qtip */
				if(plugin.settings.qtip.focusout){
					$this.qtip((valid^plugin.settings.qtip.invert)?'hide':'show');
				}
			});
		}
		
		plugin.is_valid = function(){
			if(plugin.settings.isvalid){
				var valid = plugin.settings.isvalid.call($this);	
			}
			else if(plugin.settings.master){
				var valid = ($this.val() === plugin.settings.master.val()) || (plugin.settings.master.data('checkmate').is_valid() === false);
			}
			else{
				var valid = plugin.settings.match.test($this.val());
			}
			
			if(plugin.settings.onaction){
				plugin.settings.onaction.call($this, valid);
			}
			
			return valid || ($this.val() == '' && plugin.settings.require === false);
		}
		
		plugin.validate = function(){
			var valid = plugin.is_valid();
			
			/* invoke callback */
			if(plugin.settings.validate){
				plugin.settings.validate.call($this, valid);
			}
			
			/* qtip */
			if(plugin.settings.qtip.validate){
				$this.qtip((valid^plugin.settings.qtip.invert)?'hide':'show');
			}
			
			return valid;
		}
		
		plugin.init();
	}
	
	var instances = [];
	
	var validate_all = function(set, silent){
		var all_valid = true;
		
		for(index in set){
			if(silent){
				all_valid &= set[index].data('checkmate').is_valid();
			}
			else{
				all_valid &= set[index].data('checkmate').validate();				
			}
		}
		
		return all_valid?true:false;
	}
	
	$.fn.checkmate = function(args){
		
		if( args == 'validate' || args == 'isvalid' ){
			var silent = (args == 'isvalid')?true:false;
			
			//called upon a specific checkmate object
			if( this.data('checkmate') != undefined ){
					return validate_all([this], silent);
			}
			if(arguments.length == 2 && typeof arguments[1] === 'object'){ //if defined list of objects to verify
				return validate_all(arguments[1], silent);
			}
			else{ //verify everybody
				return validate_all(instances, silent);
			}
		}
		
		console.log( this.data('checkmate') == undefined );
		
		return this.each(function(){
			if( $(this).data('checkmate') == undefined ){
				var plugin = new $.checkmate(this, args);
				$(this).data('checkmate', plugin);
				instances.push( $(this) );
			}
		});
	};
	
})( jQuery );
