import fs from 'fs'; // To interact with files

// Load users
export function loadUsers() {
  // Loads users and parses the JSON data into objects.
  const data = fs.readFileSync('./data/users.json', 'utf-8');
  return JSON.parse(data);
}

// Save users
export function saveUsers(users) {
  // Overwrites user data
  fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2));
}
