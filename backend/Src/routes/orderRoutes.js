const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/orderController'); // Import controller

// Create a new order
router.post('/create', createOrder);

module.exports = router;
