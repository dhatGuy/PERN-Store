const {
  createCartDb,
  getCartDb,
  addItemDb,
  deleteItemDb,
  increaseItemQuantityDb,
  decreaseItemQuantityDb,
  emptyCartDb,
} = require("../db/cart.db");
const { ErrorHandler } = require("../helpers/error");

class CartService {
  createCart = async (userId) => {
    try {
      return await createCartDb(userId);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };
  getCart = async (userId) => {
    try {
      return await getCartDb(userId);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  addItem = async (data) => {
    try {
      return await addItemDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  removeItem = async (data) => {
    try {
      return await deleteItemDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  increaseQuantity = async (data) => {
    try {
      return await increaseItemQuantityDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  decreaseQuantity = async (data) => {
    try {
      return await decreaseItemQuantityDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };
  emptyCart = async (cartId) => {
    try {
      return await emptyCartDb(cartId);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };
}

module.exports = new CartService();
