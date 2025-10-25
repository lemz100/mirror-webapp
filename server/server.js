const express = require('express');
const bcrypt = require('bcrypt');
const { loadUsers, saveUsers } = require('./scripts/auth'); // Imports JSON methods from auth.js
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from our server!');
});

// To distinguish input.
function validateEmail(value) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
}

app.post('/signup', async (req, res) => {
  const { fname, lname, username, email, password } = req.body; // Destructures submitted form data

  // Prevents bad actors by applying a second empty field check on submission
  if (!fname || !lname || !username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Email is invalid' });
  }

  const users = loadUsers(); // Loads users up
  const takenFields = {}; // For taken fields.
  const saltRounds = 10; // Standard value for salting

  // Gets the id of the last user in the database (for dummy testing)
  const lastId = users.length > 0 ? users[users.length - 1].id : 0;

  // Checks if email may match with a user in the database
  if (users.find((user) => user.email === email)) {
    takenFields.email = true;
  }
  if (users.find((user) => user.username === username)) {
    takenFields.username = true;
  }
  // If taken fields object isn't empty, then there are fields that are taken. Returns an error.
  if (Object.keys(takenFields).length !== 0) {
    return res.status(400).json({ taken: takenFields });
  }

  // Password hashing
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // User is recorded to be added to the database
  const name = fname + ' ' + lname;
  const newUser = {
    id: lastId + 1,
    name,
    username,
    email,
    password: hashedPassword,
  };
  // User added to the database
  users.push(newUser);
  // Database saved
  saveUsers(users);

  // Sends a response back to the client
  res.status(201).json({ message: 'User created successfully' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body; // Gets the data passed in from request (from the form in this case)
  const users = loadUsers();
  const input = username.trim(); // Normalizes username input

  // Prevents bad actors
  if (!input || !password) {
    return res.status(400).json({ message: 'Missing credentials.' });
  }
  let user; // Empty user variable

  // If input is an email
  // Checks for matches with a user in the database
  if (validateEmail(input)) {
    user = users.find((user) => user.email === input);
  } else {
    user = users.find((user) => user.username === input);
  }

  if (!user) {
    // Returns invalid if no match
    return res.status(401).json({ message: 'User not found' });
  }

  // Compares hashed password with input
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    // Returns invalid if failed comparison
    return res.status(401).json({ message: 'Invalid login details' });
  }

  // Returns successful if success.
  res.status(200).json({ message: 'Successful login', user });
});

app.listen(8080, () => {
  console.log('server listening on port 8080');
});
