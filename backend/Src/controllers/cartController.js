// cart.controller.js
const Cart = require('../models/Cart');
const Product = require('../models/productModel'); // Assuming you have a product model

// Add item to cart
exports.addItemToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find the user's cart
    let cart = await Cart.findOne({ userId });

    // If no cart exists, create a new one
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product already exists in the cart
    const existingItem = cart.items.find((item) => item.productId.toString() === productId);
    if (existingItem) {
      // Update quantity if item exists
      existingItem.quantity += quantity;
    } else {
      // Add new item to the cart
      cart.items.push({
        productId,
        itemName: product.name,
        description: product.description,
        price: product.price,
        imageURL: product.imageURL,
        quantity,
        discount: product.discount,
      });
    }

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
