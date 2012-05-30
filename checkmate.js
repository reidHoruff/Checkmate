(function( $ ){
	
	$.checkmate = function(element, args){
		var $this = $(element);
		var plugin = this;
		
		var default_settings = {
			require: true,
			
			qtip: {
				submit: false,
				keyup: false,
				keypress: false
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
				console.log('press');
				var valid = plugin.is_valid();
				
				/* invoke callback */
				if(plugin.settings.keypress){
					plugin.settings.keypress.call( $this, valid );
				}
				
				/* qtip */
				if(plugin.settings.qtip.keyup){
					$this.qtip(valid?'hide':'show');
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
					$this.qtip(valid?'hide':'show');
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
			var match = plugin.is_valid();
			
			/* invoke callback */
			if(plugin.settings.validate){
				plugin.settings.validate.call($this, match);
			}
			
			/* qtip */
			if(plugin.settings.qtip.validate){
				$this.qtip(match?'hide':'show');
			}
			
			return match;
		}
		
		plugin.init();
	}
	
	var instances = [];
	
	$.fn.checkmate = function(args){
		
		if(args == 'validate'){
			var all_valid = true;
			
			for(index in instances){
				all_valid &= instances[index].data('checkmate').validate();
			}
			
			return all_valid?true:false;
		}
		else if(args == 'isvalid'){
			var all_valid = true;
			
			for(index in instances){
				all_valid &= instances[index].data('checkmate').is_valid();
			}
			
			return all_valid?true:false;
		}
		
		return this.each(function(){
			if( $(this).data('checkmate') == undefined ){
				var plugin = new $.checkmate(this, args);
				$(this).data('checkmate', plugin);
				instances.push( $(this) );
			}
			else{
				var instance = $(this).data('checkmate');
				console.log('instance');
			}
		});
	};
	
})( jQuery );
