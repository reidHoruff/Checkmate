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
			
			if(!plugin.settings.match){
				$.error('No pattern defined');
			}
			
			/* if linked to submit to button */
			if(plugin.settings.submit){
				plugin.settings.submit.click(function(){
					/* validate on call back */
					validate.call($this);
				});
			}
			
			/* key press listener */
			$this.keyup(function(){
				console.log('press');
				var match = is_valid();
				
				/* invoke callback */
				if(plugin.settings.keypress){
					plugin.settings.keypress.call( $this, match );
				}
				
				/* qtip */
				if(plugin.settings.qtip.keyup){
					$this.qtip(match?'hide':'show');
				}
			});
			
			/* focus out listener */
			$this.focusout(function(){
				var match = is_valid();
				
				/* invoke callback */
				if(plugin.settings.focusout){
					plugin.settings.focusout.call( $this, match );
				}
				
				/* qtip */
				if(plugin.settings.qtip.focusout){
					$this.qtip(match?'hide':'show');
				}
			});
		}
		
		var is_valid = function(){
			var match = plugin.settings.match.test($this.val());
			return match || ($this.val() == '' && plugin.settings.require === false);
		}
		
		plugin.validate = function(){
			console.log('validate');
			var match = is_valid();
			
			/* invoke callback */
			if(plugin.settings.validate){
				plugin.settings.validate.call($this, match);
			}
			
			/* qtip */
			if(plugin.settings.qtip.submit){
				$this.qtip(match?'hide':'show');
			}
			
			return $this;
		}
		
		plugin.init();
	}
	
	$.fn.checkmate = function(args){
		return this.each(function(){
			if( $(this).data('checkmate') == undefined ){
				var plugin = new $.checkmate(this, args);
				$(this).data('checkmate', plugin);
			}
		});
	};
	
})( jQuery );
