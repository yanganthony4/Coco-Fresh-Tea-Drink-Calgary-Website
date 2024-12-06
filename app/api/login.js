const users = require('./users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET_KEY = "your-secret-key"; // Replace with a secure secret key

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Find the user by username
    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    return res.status(200).json({ token });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
