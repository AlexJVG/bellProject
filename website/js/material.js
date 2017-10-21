$(function(){
	$('.material-form-control').each(function(){
		changeState($(this));
	});
	
	$('.material-form-control').on('focusout', function() {
		changeState($(this)); 
	});
	
	function changeState($formControl){
		if($formControl.val().length > 0){
			$formControl.addClass('has-value');
		} else {
			$formControl.removeClass('has-value');
		}  
	}
});