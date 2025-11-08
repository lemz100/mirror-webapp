const express = require('express');
const bcrypt = require('bcrypt');
const {
  checkUsernameEmailClash,
  matchUser,
  authenticate,
  testConnection,
  validateEmail,
} = require('./scripts/helper');
const app = express();
const pool = require('./data/db');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from our server!');
});

app.post('/signup', async (req, res) => {
  const { fname, lname, username, email, password } = req.body; // Destructures submitted form data
  const takenFields = {}; // For taken fields.
  const saltRounds = 10; // Standard value for salting

  // Prevents bad actors by applying a second empty field check on submission
  if (!fname || !lname || !username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Email is invalid' });
  }

  // Checks if email may match with a user in the database
  const query1 = await pool.query(
    'SELECT * FROM users WHERE email = $1 OR username = $2',
    [email, username]
  );
  checkUsernameEmailClash(query1, takenFields, username, email);
  // If taken fields object isn't empty, then there are fields that are taken. Returns an error.
  if (Object.keys(takenFields).length !== 0) {
    return res.status(400).json({ taken: takenFields });
  }

  // Password hashing
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  // User is recorded to be added to the database
  const name = fname + ' ' + lname;

  // User added to the database
  const insertQuery = await pool.query(
    'INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *;',
    [name, username, email, hashedPassword]
  );

  // Sends a response back to the client
  res.status(201).json({ message: 'User created successfully' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body; // Gets the data passed in from request (from the form in this case)
  const input = username.trim(); // Normalizes username input

  // Prevents bad actors
  if (!input || !password) {
    return res.status(400).json({ message: 'Missing credentials.' });
  }
  // Runs function that checks for username/email match with users in the DB.
  let user = await matchUser(input);
  if (!user) {
    // Returns invalid if no match
    return res.status(401).json({ message: 'User not found' });
  }

  const authenticated = await authenticate(user, password);
  if (!authenticated) {
    // Returns invalid if failed comparison
    return res.status(401).json({ message: 'Invalid login details' });
  }

  // Returns successful if success.
  res.status(200).json({ message: 'Successful login', user });
});

app.listen(8080, () => {
  console.log('server listening on port 8080');
});

testConnection();
