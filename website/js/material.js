var materialFormControl = document.getElementsByClassName('material-form-control');
for (var i = 0; i < materialFormControl.length; i++) {
	materialFormControl[i].addEventListener('focusout', function(event) {
		changeState(this);
	});
}

function changeState(formControl) {
	if (formControl.value.length > 0) {
		formControl.classList.add('has-value');
	} else {
		formControl.classList.remove('has-value');
	}
}