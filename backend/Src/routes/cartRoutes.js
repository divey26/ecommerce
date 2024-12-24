// cartRoutes.js

const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/productModel');

router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Fetch cart for the user
    const cart = await Cart.findOne({ userId }).populate('products.productId', 'itemName price imageURL'); // Ensure productId is populated correctly
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }

    res.status(200).json({ cartItems: cart.products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching cart data' });
  }
});

/// Remove product from cart (ensure using productId and not _id)
router.delete('/remove', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Filter out the product using productId (not _id)
    cart.products = cart.products.filter(item => item.productId !== productId);

    await cart.save();
    res.status(200).json({ message: 'Product removed from cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error removing product from cart' });
  }
});

module.exports = router;