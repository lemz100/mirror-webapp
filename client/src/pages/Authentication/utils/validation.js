/**
 * Helper validation script - contains pure functions for validating forms using javascript.
 */

// Email validation
function validateEmail(value) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pattern for emails
  return regex.test(value); // Returns true / false if email input is valid.
}

export function isMinimum(str, min) {
  // Checks if string has minimum of 8 characters.
  // Can input normal number - function normalises it for you into index.
  return str.length >= min;
}

// Number validation - checks if a string has a number inside it.
export function hasNumbers(str) {
  // Returns true if there is a number in the string
  return /\d/.test(str);
}

// Checks if a string has uppercase inside it.
export function hasUppercase(str) {
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

  // Helper function - checks if a field is empty or if it has only whitespace.
  // Solves the edge case of user entering only whitespace
  function checkEmpty(field) {
    if (!field || field.trim() == '') {
      return true;
    }
    return false;
  }

  if (checkEmpty(formData.fname)) {
    newErrors.fname = emptyErrorMsg;
  } else if (formData.fname.length === 1 || hasNumbers(formData.fname)) {
    newErrors.fname = 'Please enter a valid first name';
  }
  if (checkEmpty(formData.lname)) {
    newErrors.lname = emptyErrorMsg;
  } else if (formData.lname.length === 1 || hasNumbers(formData.lname)) {
    newErrors.lname = 'Please enter a valid last name';
  }
  if (checkEmpty(formData.email)) {
    newErrors.email = emptyErrorMsg;
  } else if (validateEmail(formData.email) === false) {
    newErrors.email = 'Please enter a valid email address';
  }
  if (checkEmpty(formData.username)) {
    newErrors.username = emptyErrorMsg;
  } else if (!isMinimum(formData.username, 6)) {
    newErrors.username = 'Username needs a minimum of 6 characters';
  } else if (formData.username === formData.email || validateEmail(formData.username)) {
    // Add another test case for this
    newErrors.username = 'Username cannot be an email';
  }

  if (checkEmpty(formData.password)) {
    newErrors.password = emptyErrorMsg;
  } else {
    const allValid = validatePword(formData.password);
    if (!allValid) {
      newErrors.password = 'Please choose a stronger password';
    }
  }
  return newErrors;
}

// Returns true if password adheres to checks in the object.
export function validatePword(password) {
  // Performs relative functions for each check in the object. Returns true if all functions return true.
  console.log(password);
  console.log(checks);
  const checks = {
    minLength: isMinimum(password, 8),
    hasUppercase: hasUppercase(password),
    hasNumber: hasNumbers(password),
  };
  return Object.values(checks).every(Boolean);
}
