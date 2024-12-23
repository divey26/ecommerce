const Product = require('../models/productModel');

exports.createProduct = async (req, res) => {
  try {
    const { productId, itemName, category, subcategory, price, rating, offerName, discount, description, imageURL } = req.body;

    const newProduct = new Product({
      productId,
      itemName,
      category,
      subcategory,
      price,
      rating,
      offerName,
      discount,
      description,
      imageURL,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product saved successfully!', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving product data' });
  }
};

exports.getProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json({ products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching products' });
    }
  };

  // productController.js

exports.editProduct = async (req, res) => {
    const { productId } = req.params;
    const updateData = req.body;
  
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updateData,
        { new: true } // Returns the updated product
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating product' });
    }
  };
  
  // productController.js

exports.deleteProduct = async (req, res) => {
    const { productId } = req.params;
  
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);
  
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting product' });
    }
  };
  