const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Add to cart
router.post("/add", cartController.addToCart);

// Get user's cart
router.get("/:userId", cartController.getCart);

// Clear cart
router.delete("/clear", cartController.clearCart);

module.exports = router;
