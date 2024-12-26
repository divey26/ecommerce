const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Register endpoint
router.post('/register', UserController.registerUser);

// Login endpoint
router.post('/login', UserController.loginUser);

module.exports = router;
