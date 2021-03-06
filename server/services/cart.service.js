const {
  createCartDb,
  getCartDb,
  addItemDb,
  deleteItemDb,
  increaseItemQuantityDb,
  decreaseItemQuantityDb,
} = require("../db/cart.db");

class CartService {
  createCart = async (userId) => {
    try {
      return await createCartDb(userId);
    } catch (error) {
      throw error;
    }
  };
  getCart = async (userId) => {
    try {
      return await getCartDb(userId);
    } catch (error) {
      throw error;
    }
  };

  addItem = async (data) => {
    try {
      return await addItemDb(data);
    } catch (error) {
      throw error;
    }
  };

  removeItem = async (data) => {
    try {
      return await deleteItemDb(data);
    } catch (error) {
      throw error;
    }
  };

  increaseQuantity = async (data) => {
    try {
      return await increaseItemQuantityDb(data);
    } catch (error) {
      throw error;
    }
  };

  decreaseQuantity = async (data) => {
    try {
      return await decreaseItemQuantityDb(data);
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new CartService();
