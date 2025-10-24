const express = require('express');
const { loadUsers, saveUsers } = require('./auth'); // Imports JSON methods from auth.js
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from our server!');
});

app.post('/signup', (req, res) => {
  const { fname, lname, username, email, password } = req.body; // Destructures submitted form data
  const users = loadUsers(); // Loads users up

  // Gets the id of the last user in the database (for dummy testing)
  const lastId = users.length > 0 ? users[users.length - 1].id : 0;

  // Checks if email may match with a user in the database
  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ message: 'Email is taken' });
  } else if (users.find((user) => user.username === username)) {
    // Checks if username may match with a user in the database
    return res.status(400).json({ message: 'Username is taken ' });
  }

  // Add password hashing in future implementation.

  const name = fname + ' ' + lname;
  const newUser = {
    id: lastId + 1,
    name,
    username,
    email,
    password,
  };
  users.push(newUser);
  saveUsers(users);
  res.status(201).json({ message: 'User created successfully' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body; // Gets the data passed in from request (from the form in this case)
  const users = loadUsers();
  const input = username.trim().toLowerCase(); // Normalizes username input

  // Checks for user details match.
  // User can use their email or username to login to their account with this.
  // Normalizes input
  const user = users.find(
    (u) =>
      (u.username.toLowerCase() === input || u.email.toLowerCase() === input) &&
      u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid login details ' });
  }

  res.status(200).json({ message: 'Successful login', user });
});

app.listen(8080, () => {
  console.log('server listening on port 8080');
});
