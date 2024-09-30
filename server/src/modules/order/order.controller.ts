import { Request, Response } from "express";
import { ApiResponse } from "~/utils/apiResponse";
import { OrderService } from "./order.service";

export class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  createOrder = async (req: Request, res: Response) => {
    const { amount, itemTotal, paymentMethod, paymentReference } = req.body;
    const userId = req.user!.id;
    const cartId = req.user!.cartId;

    const newOrder = await this.orderService.createOrder({
      cartId,
      amount,
      itemTotal,
      userId,
      paymentMethod,
      paymentReference,
    });

    res.status(201).json(ApiResponse.success("Order created", newOrder));
  };

  getAllOrders = async (req: Request, res: Response) => {
    const { page, limit } = req.query;
    const userId = req.user!.id;

    const orders = await this.orderService.getAllOrders({
      userId,
      page: Number(page),
      limit: Number(limit),
    });

    res.json(
      ApiResponse.paginated(
        "Orders fetched successfully",
        orders.items,
        Number(page),
        Number(limit),
        orders.total
      )
    );
  };

  updateOrder = async (req: Request, res: Response) => {
    const { id } = req.params;

    const order = await this.orderService.updateOrder(
      +id,
      req.user!.cartId,
      req.body
    );

    res.json(ApiResponse.success("Order updated", order));
  };

  getOrder = async (req: Request, res: Response) => {
    const { id } = req.params;

    const order = await this.orderService.getOrderById(+id);

    res.json(ApiResponse.success("Order fetched", order));
  };
}
