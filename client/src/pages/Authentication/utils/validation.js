/**
 * Helper validation script - contains pure functions for validating forms using javascript.
 */

// Email validation
function validateEmail(value) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pattern for emails
  return regex.test(value); // Returns true / false if email input is valid.
}

// Number validation - checks if a string has a number inside it.
function hasNumbers(str) {
  // Returns true if there is a number in the string
  return /\d/.test(str);
}

// Checks if a string has uppercase inside it.
function hasUppercase(str) {
  // Returns true if the string has an uppercase letter inside it.
  return /[A-Z]/.test(str);
}

/** Login Form validation method - includes error messages for each form input
 * @param {Object} formData - form input values
 * @returns {Object} newErrors - errors for each form input
 */
export function validateLoginForm(formData) {
  const newErrors = {};
  const emptyErrorMsg = 'This field is required';

  if (formData.username === '') {
    newErrors.username = emptyErrorMsg;
  } else if (formData.username.length < 6) {
    newErrors.username = 'Username is too short - minimum of 6 characters';
  }
  if (formData.password === '') {
    newErrors.password = emptyErrorMsg;
  } else if (formData.password.length < 7) {
    newErrors.password = 'Password is too short - minimum of 8 characters';
  }

  return newErrors;
}

/** Signup Form validation method - includes error messages for each form input
 * @param {Object} formData - form input values
 * @returns {Object} newErrors - errors for each form input
 */
export function validateSignupForm(formData) {
  const newErrors = {}; /** Object which will output error messages based on the values submitted */
  const emptyErrorMsg = 'This field is required';

  if (formData.fname === '') {
    newErrors.fname = emptyErrorMsg;
  } else if (formData.fname.length === 1 || hasNumbers(formData.fname)) {
    newErrors.fname = 'Please enter a valid first name';
  }
  if (formData.lname === '') {
    newErrors.lname = emptyErrorMsg;
  } else if (formData.lname.length === 1 || hasNumbers(formData.lname)) {
    newErrors.lname = 'Please enter a valid last name';
  }
  if (formData.email === '') {
    newErrors.email = emptyErrorMsg;
  } else if (validateEmail(formData.email) === false) {
    newErrors.email = 'Please enter a valid email address';
  }
  if (formData.username === '') {
    newErrors.username = emptyErrorMsg;
  } else if (formData.username.length < 6) {
    newErrors.username = 'Username needs a minimum of 6 characters';
  } else if (formData.username === formData.email || validateEmail(formData.username)) {
    // Add another test case for this
    newErrors.username = 'Username cannot be an email';
  }
  if (formData.password === '') {
    newErrors.password = emptyErrorMsg;
  } else if (formData.password.length < 7) {
    newErrors.password = 'Password needs at least 8 characters.';
  } else if (!hasUppercase(formData.password)) {
    newErrors.password = 'Password needs an uppercase letter';
  }

  return newErrors;
}
