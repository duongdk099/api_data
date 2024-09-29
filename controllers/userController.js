require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await sql`SELECT * FROM users`;
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await sql`SELECT * FROM users WHERE user_id = ${userId}`;

    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user
    const newUser = await sql`
      INSERT INTO users (username, email, password_hash)
      VALUES (${username}, ${email}, ${hashedPassword})
      RETURNING *;
    `;
    res.json(newUser[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

// Update user details
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, password } = req.body;
    let hashedPassword = null;

    // Hash the password if provided
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await sql`
      UPDATE users
      SET username = ${username}, email = ${email}
      ${hashedPassword ? sql`, password_hash = ${hashedPassword}` : sql``}
      WHERE user_id = ${userId}
      RETURNING *;
    `;
    res.json(updatedUser[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

// Login a user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;

    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password_hash);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }
    // Generate a JWT token
    const token = jwt.sign({ userId: user[0].user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ user: user[0], token });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

// Update user password
exports.updatePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await sql`
      UPDATE users
      SET password_hash = ${hashedPassword}
      WHERE user_id = ${userId}
      RETURNING *;
    `;
    res.json(updatedUser[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error updating password' });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await sql`
      DELETE FROM users WHERE user_id = ${userId} RETURNING *;
    `;
    res.json(deletedUser[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};