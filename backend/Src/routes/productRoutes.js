const express = require('express');
const router = express.Router();
const { createProduct,getProducts,editProduct,deleteProduct} = require('../controllers/productController');

router.post('/', createProduct);
router.get('/', getProducts);  // Fetch all products
router.put('/:productId', editProduct);  // Edit product
router.delete('/:productId', deleteProduct);  // Delete product


module.exports = router;
