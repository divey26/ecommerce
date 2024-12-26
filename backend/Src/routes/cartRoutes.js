// cart.routes.js
const express = require('express');
const router = express.Router();
const { addItemToCart } = require('../controllers/cartController');

// Route to add an item to the cart
router.post('/add', addItemToCart);

module.exports = router;
