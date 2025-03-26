// In sellerRoutes.js

const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController');

// Route for seller signup
router.post('/signup', sellerController.createSeller);

// Route to fetch the next seller ID
router.get('/getSellerId', sellerController.getSellerId);

// Route for seller login
router.post('/login', sellerController.loginSeller);

module.exports = router;
