import { Request, Response } from "express";
import { ApiResponse } from "~/utils/apiResponse";
import { CartService } from "./cart.service";

export class CartController {
  private cartService: CartService;

  constructor() {
    this.cartService = new CartService();
  }

  getCart = async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const cart = await this.cartService.getCart(userId);
    res.json(ApiResponse.success("Cart fetched successfully", cart));
  };

  updateCart = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { productId, quantity } = req.body;

    const cart = await this.cartService.updateCart({
      userId,
      productId,
      quantity,
    });
    res.json({ items: cart });
  };

  deleteItem = async (req: Request, res: Response) => {
    const { cartId, id: _userId } = req.user!;
    const { productId } = req.body;

    // delete item from cart
    await this.cartService.removeItem({ cartId, productId });
    res.sendStatus(204);
  };

  // increaseItemQuantity = async (req: Request, res: Response) => {
  //   const userId = req.user.id;
  //   const { productId } = req.body;

  //   // increase item quantity
  //   const cart = await this.cartService.increaseItemQuantity(userId, productId);
  //   res.json({ items: cart });
  // };

  // decreaseItemQuantity = async (req: Request, res: Response) => {
  //   const userId = req.user.id;
  //   const { productId } = req.body;

  //   // decrease item quantity
  //   const cart = await this.cartService.decreaseItemQuantity(userId, productId);
  //   res.json({ items: cart });
  // };
}
