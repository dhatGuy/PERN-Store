const pool = require("../config");
const productService = require("../services/product.service");

const getAllProducts = async (req, res) => {
  const { page = 1 } = req.query;

  try {
    const products = await productService.getAllProducts(page);
    res.json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = await productService.addProduct(req.body);
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};
const updateProduct = async (req, res) => {
  const { name, price, description } = req.body;
  const { id } = req.params;
  try {
    const updatedProduct = await productService.updateProduct({
      name,
      price,
      description,
      id,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await productService.removeProduct(id);
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
};
