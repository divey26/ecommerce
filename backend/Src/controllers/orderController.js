const Order = require('../models/orderModel');

exports.createOrder = async (req, res) => {
  try {
    const { userId, cartItems, paymentIntentId, paymentStatus, totalAmount, shippingAddress } = req.body;

//    console.log('Received Order Data:', { userId, cartItems, paymentIntentId, paymentStatus, totalAmount, shippingAddress });

    // Validate required fields
    if (!userId || !cartItems || cartItems.length === 0 || !paymentIntentId || !totalAmount || isNaN(totalAmount) || !paymentStatus) {
      return res.status(400).json({ message: 'Invalid or missing order details' });
    }

    const newOrder = new Order({
      userId,
      cartItems,
      totalAmount,
      paymentIntentId,
      paymentStatus,
      orderDate: new Date(),
      shippingAddress,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: newOrder });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error placing order. Please try again.' });
  }
};
