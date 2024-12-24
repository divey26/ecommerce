const mongoose = require('mongoose');

// Cart Schema with product reference
const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: String, required: true }, // ProductId is string
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
