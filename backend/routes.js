const express = require('express');

const {
  getProducts,
  addNewProduct,
  updatedProduct,
  deleteProduct
} = require('./productController');

const router = express.Router();

router.get('/products', getProducts);
router.post('/products', addNewProduct);
router.put('/products/:id', updatedProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;