const { createCartDb } = require("../db/cart.db")

class CartService{
  async createCart(userId){
    try {
      return await createCartDb(userId)
    } catch (error) {
      return error
    }
  }
}

module.exports = new CartService()
