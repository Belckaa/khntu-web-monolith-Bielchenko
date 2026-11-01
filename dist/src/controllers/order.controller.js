"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_service_1 = require("../services/order.service");
const orderService = new order_service_1.OrderService();
class OrderController {
    static async create(req, res, next) {
        try {
            const { userId, items } = req.body;
            const order = await orderService.createOrder(userId, items);
            res.status(201).json({ status: 'success', data: order });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.OrderController = OrderController;
