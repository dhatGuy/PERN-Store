const {
  getAllProductsDb,
  createProductDb,
  getProductDb,
  updateProductDb,
  deleteProductDb,
} = require("../db/product.db");

class ProductService {
  getAllProducts = async (page) => {
    const limit = 12;
    const offset = (page - 1) * limit;
    try {
      return await getAllProductsDb({ limit, offset });
    } catch (error) {
      throw error;
    }
  };

  addProduct = async (data) => {
    try {
      return await createProductDb(data);
    } catch (error) {
      throw error;
    }
  };

  getProductById = async (id) => {
    try {
      return await getProductDb(id);
    } catch (error) {
      throw error;
    }
  };

  getProductByName = async (name) => {
    try {
      return await getProductByNameDb(name);
    } catch (error) {
      throw error;
    }
  };

  updateProduct = async (data) => {
    try {
      return await updateProductDb(data);
    } catch (error) {
      throw error;
    }
  };

  removeProduct = async (id) => {
    try {
      return await deleteProductDb(id);
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new ProductService();
