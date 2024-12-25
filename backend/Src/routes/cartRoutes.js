// Src/routes/cartRoutes.js
const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/product');
const router = express.Router();

// Add item to cart
router.post('/add', async (req, res) => {
  const { userId, productId, quantity = 1 } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (productIndex > -1) {
      cart.items[productIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error });
  }
});

// Get cart items
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cart', error });
  }
});

// Remove item from cart
router.delete('/remove', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();

    res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from cart', error });
  }
});

// Update cart item quantity
router.put('/update', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (productIndex > -1) {
      cart.items[productIndex].quantity = quantity;
      await cart.save();
      return res.status(200).json({ message: 'Cart updated', cart });
    }

    res.status(404).json({ message: 'Product not found in cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart', error });
  }
});

module.exports = router;
