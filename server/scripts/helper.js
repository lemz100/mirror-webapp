const pool = require('../data/db');
const bcrypt = require('bcrypt');

// File that includes helper functions used for logging in or signing up applications.
// Packages required = pool, bcrypt.

/**
 * Helper method to check if username or email in the signup clashes with users that have already registered
 * with the same username / email.
 */
function checkUsernameEmailClash(query, takenArr, username, email) {
  // Query should return users in the database that have the same username or email as the input.
  if (query.rows.length > 0) {
    // If query returns anything, get part of the query where the data is located.
    let arr = [...query.rows]; // Data entries in an array (per user)
    arr.forEach((user) => {
      // For each user return below variables as true if username or email match with input
      let unameValid = user.username === username;
      let emailValid = user.email === email;

      unameValid ? (takenArr.username = true) : null; // If true, takenArr has a new property of username which equals true - username matches.
      emailValid ? (takenArr.email = true) : null;
    });
  }
}

/** Helper method to distinguish user input of either a username or email */
function validateEmail(value) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation method
  return regex.test(value);
}

/** Helper function which takes user inputted username/email and checks the DB
 * to see if it matches a user
 */
async function matchUser(username) {
  let query; // Empty query variable
  let user; // Empty user object - when function finds a match, this will be filled.
  if (validateEmail(username)) {
    /**
     * If user inputs an email (to login with their email instead of username)
     * Query runs based on user input =
     */
    query = await pool.query('SELECT * FROM users WHERE email = $1', [
      username,
    ]);

    // Or query the JSON database
    // user = users.find((user) => user.email === username)
  } else {
    query = await pool.query('SELECT * FROM users WHERE username = $1', [
      username,
    ]);
    // JSON
    // user = users.find((user) => user.username === username)
  }

  // If there is no results in the query, return false.
  if (query.rows.length === 0) {
    return false;
  }
  let arr = [...query.rows][0]; // Destructured user data from SQL query - not needed if using JSON.

  // Populates empty user object. - not needed if using JSON
  user = {
    name: arr.name,
    username: arr.username,
    email: arr.email,
    password: arr.password,
  };

  return user;
}

/**
 * Helper function that authenticates user (user object created by matchUser)
 */
async function authenticate(user, password) {
  // Compares input password with hashed password of the user.
  // Async function because of hashing algorithm

  const authenticated = await bcrypt.compare(password, user.password); // Returns true if comparison is true

  return authenticated;
}
/** Tests connection to the database */
async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()'); // Gets the current date - test query to see if connection is live.
    console.log('Database connected: ', res.rows[0]);
  } catch (err) {
    console.error('Database connection error:', err);
  }
}

module.exports = {
  checkUsernameEmailClash,
  validateEmail,
  matchUser,
  authenticate,
  testConnection,
};
