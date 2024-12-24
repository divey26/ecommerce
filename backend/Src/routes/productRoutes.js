const express = require('express');
const router = express.Router();
const { createProduct,getProducts,getProductById,editProduct,deleteProduct} = require('../controllers/productController');

router.post('/', createProduct);
router.get('/', getProducts);  // Fetch all products
router.get('/:productId', getProductById); // Fetch product details by productId
router.put('/:productId', editProduct);  // Edit product
router.delete('/:productId', deleteProduct);  // Delete product


module.exports = router;
