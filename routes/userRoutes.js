const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');  // Import the middleware
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  updatePassword
} = require('../controllers/userController');

// Define user routes
router.get('/', verifyToken, getUsers);  // Apply middleware
router.get('/:userId', verifyToken, getUserById);  // Apply middleware
router.post('/register', createUser);
router.post('/login', login);
router.put('/:userId', verifyToken, updateUser);  // Apply middleware
router.put('/:userId/password', verifyToken, updatePassword);  // Apply middleware
router.delete('/:userId', verifyToken, deleteUser);  // Apply middleware

module.exports = router;