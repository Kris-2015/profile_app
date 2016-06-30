
$(document).ready(function(){
	//Register events for validation
	validation.validate();
});

// object to store any errors and call all the validation functions
var validation = {
	noError: true,
	/**
	 * Calls all the validation function
	 * @param void
	 * @retrun void
	 */
	validate: function (){

		//validate text fields
		validateText();

		//validate number fields
		validateNumber();

		//validate email field
		validateEmail();

		//validate password field
		validatePassword();

		//gender,radio, checkbox span not in pos

		//check for required fields
	}
}

 /**
 * Validates text fields
 * @param void
 * @retrun void
 */
function validateText() {

	$('.text_input').on( "blur keyup ", function(){
		//set the error text to empty string
		$(this).parent().children('span').text('');
		validation.noError = true;

		if ( $(this)[0].value.length > constants.textInputLength ) {

			validation.noError = false;
			$(this).parent().children('span').text("Only "+constants.textInputLength+" characters  allowed");
		}
		
		if ( !(/^[a-zA-Z ]*$/.test($(this)[0].value) ) ) {
			
			validation.noError = false;
			$(this).parent().children('span').text("Only charaters and white spaces allowed");
		}
	}); 
}

/**
 * Validates number fields
 * @param void
 * @retrun void
 */
function validateNumber() {

	$('.numbers').on( "blur keyup", function(){
		//set the error text to empty string
		$(this).parent().children('span').text('');
		validation.noError = true;

		if ( !(/^[0-9]*$/.test($(this)[0].value) ) ) {

			validation.noError = false;
			$(this).parent().children('span').text("Only numbers are allowed");
		} else if ( $(this)[0].value !== '' ) {

			//validation for phone numbers
			if ( (($(this)[0].name == 'mobile') || ($(this)[0].name == 'landline')) &&  ($(this)[0].value.length != constants.mobileLength) ) {
			
				validation.noError = false;
				$(this).parent().children('span').text("You must enter "+constants.mobileLength+" digits");
			}

			//validation for zip numbers
			if ( (($(this)[0].name == 'residenceZip') || ($(this)[0].name == 'officeZip')) &&  ($(this)[0].value.length != constants.zipLength) ) {
				validation.noError = false;
				$(this).parent().children('span').text("You must enter "+constants.zipLength+" digits");
			}

			//validation for fax numbers
			if ( (($(this)[0].name == 'residenceFax') || ($(this)[0].name == 'officeFax')) &&  ($(this)[0].value.length != constants.faxLength )	 ) {
				validation.noError = false;
				$(this).parent().children('span').text("You must enter "+constants.faxLength+" digits");
			}
		}
	}); 
}

/**
 * Validates email field
 * @param void
 * @retrun void
 */
function validateEmail() {

	var checkEmail = /^[a-zA-Z0-9@._-]*$/;
	var email = $('.email');
	email.on( "blur keyup", function(){
		//set the error text to empty string
		$(this).parent().children('span').text('');
		validation.noError = true;
		var atpos = email[0].value.indexOf("@");
    	var dotpos = email[0].value.lastIndexOf(".");

		if ( !checkEmail.test($(this)[0].value) ) {

			validation.noError = false;
			$(this).parent().children('span').text("Invalid email");
			
		}else if ( $(this)[0].value == '' ) {
			$(this).parent().children('span').text('');
			validation.noError = true;

		} else if ( $(this)[0].value.length > constants.emailLength ) {

			validation.noError = false;
			$(this).parent().children('span').text("Email should be less than " + constants.emailLength + " charaters");
		} else if ( (atpos<1) || (dotpos<atpos+2) || (dotpos+2 >= $(this)[0].value.length) ) {

			validation.noError = false;
			$(this).parent().children('span').text("Invalid email");
		}
	}); 
}

/**
 * Validates password field
 * @param void
 * @retrun void
 */
function validatePassword() { 
	var checkPassword = /^[a-zA-Z0-9]*$/ ;
	$('.password').on("blur keyup", function(){
		//set the error text to empty string
		$(this).parent().children('span').text('');
		validation.noError = true;

		if ( !checkPassword.test($(this)[0].value) ) {
			validation.noError = false;
			$(this).parent().children('span').text("Only letters and numbers are allowed");
		} else if ( $(this)[0].value.length > constants.passwordLength ) {
			validation.noError = false;
			$(this).parent().children('span').text("Only " + constants.passwordLength + " charaters allowed");
		}
		//do validation of password match

	});
}