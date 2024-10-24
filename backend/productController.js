const Product = require('./productModel');

const getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
  }

const addNewProduct = async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
  }

const updatedProduct = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  }

const deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  }

module.exports =
{
    getProducts,
    addNewProduct,
    updatedProduct,
    deleteProduct
}