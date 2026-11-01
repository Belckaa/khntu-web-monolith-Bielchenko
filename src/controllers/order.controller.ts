import { Request, Response, NextFunction } from 'express';
import { OrderService } from '../services/order.service';

const orderService = new OrderService();

export class OrderController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, items } = req.body;
      const order = await orderService.createOrder(userId, items);
      res.status(201).json({ status: 'success', data: order });
    } catch (error) {
      next(error);
    }
  }
}