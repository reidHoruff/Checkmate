(function( $ ){
	
	function init(args){
		
		$(this).data('validate', args);
		var data = $(this).data('validate');
		
		if( !data.match ){
			$.error('No pattern defined');
		}
		
		if( args.keypress ){
			this.keyup(function(){
				data.keypress.call( $(this), args.match.test($(this).val()) );
			});
		}
		
		this.focusout(function(){
			var match = args.match.test($(this).val());
			
			if(data.focusout){
				data.focusout.call( $(this), match );
			}
			
			if(data.qtip && data.qtip.focusout){
				$(this).qtip(match?'hide':'show');
			}
		});
	}
	
	function validate(){
		
		var data = $(this).data('validate');
		
		if(data.validate){
			data.validate.call( $(this), data.match.test(this.val()) );
		}
		else{
			$.error('No validation callback method set');
		}	
	}
	
	$.fn.verify = function(args){
		
		if(args == 'validate'){
			validate.call(this);
		}
		else{
			init.call(this, args);
		}
	};
	
})( jQuery );
