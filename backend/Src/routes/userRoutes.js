const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware to verify JWT

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getUserProfile);  // Fetch profile
router.put('/profile', authMiddleware, updateUserProfile);  // Update profile

module.exports = router;
