const emptyMessage = 'Field cannot be empty';

function isValidEmailFormat(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

function isValidPasswordAndConfirmPassword(password, cPassword) {
	if (password !== cPassword) return false;
	return true;
}

function isValidEmail(email) {
	if (email === '') {
		return { valid: false, message: 'Email cannot be empty' };
	}
	if (!isValidEmailFormat(email)) return { valid: false, message: 'Please enter the valid email' };
	return { valid: true };
}

function isValidConfirmPassword(password, confirmPassword) {
	if (confirmPassword === '') return 'Confirm password cannot be empty';
	if (password !== confirmPassword) return 'Password and Confirm password do not match!';
	return true;
}

function isValidPassword(password) {
	if (password === '') return 'Password cannot be empty';
	if (password.length < 6) return 'Password cannot be shorter than 6 characters!';
	return true;
}

function isValidPicture(picture) {
	if (picture == null) return 'Picture cannot be empty';
}

function checkEmpty(field) {
	if (field === '') return '{{Field}} cannot be empty';
	return true;
}

export { isValidConfirmPassword, isValidEmail, isValidPassword, isValidPicture, checkEmpty, isValidEmailFormat };
