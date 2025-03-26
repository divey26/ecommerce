const mongoose = require('mongoose');
const Product = require('./Src/models/productModel');
const Seller = require('./Src/models/sellerModel'); // Assuming you have a Seller model

mongoose.connect('mongodb+srv://signature:alex20020226@sb.nclisq7.mongodb.net/SWEET?retryWrites=true&w=majority&appName=SB', { useNewUrlParser: true, useUnifiedTopology: true });

async function updateExistingProducts() {
  try {
    const defaultSeller = await Seller.findOne({ sellerId: 'SE001' }); // Find seller by sellerId
    if (!defaultSeller) {
      console.log('Seller not found');
      mongoose.connection.close();
      return;
    }

    await Product.updateMany(
      { sellerId: { $exists: false } },
      { $set: { sellerId: defaultSeller._id } }
    );
    console.log('Existing products updated successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error updating products:', error);
    mongoose.connection.close();
  }
}

updateExistingProducts();
