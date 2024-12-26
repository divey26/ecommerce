const Cart = require("../models/Cart");

// Add or update a cart
exports.addToCart = async (req, res) => {
  const { userId, items } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If no cart exists, create a new one
      cart = new Cart({ userId, items });
    } else {
      // If cart exists, update it
      items.forEach((newItem) => {
        const existingItem = cart.items.find(
          (item) => item.productId.toString() === newItem.productId
        );

        if (existingItem) {
          existingItem.quantity += newItem.quantity;
        } else {
          cart.items.push(newItem);
        }
      });
    }

    await cart.save();
    res.status(200).json({ message: "Cart updated successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Error updating cart", error });
  }
};

// Get the user's cart
exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

// Clear the user's cart
exports.clearCart = async (req, res) => {
  const { userId } = req.body;

  try {
    await Cart.deleteOne({ userId });
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error });
  }
};
