const express = require('express');
const router = express.Router();
const { createItem, getAllItems } = require('../controllers/ItemController');

// Routes for creating and fetching items
router.post('/item', createItem);
router.get('/items', getAllItems);

module.exports = router;
