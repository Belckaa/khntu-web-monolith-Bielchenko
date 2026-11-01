"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const order_repository_1 = require("../repositories/order.repository");
const orderRepository = new order_repository_1.OrderRepository();
class OrderService {
    async createOrder(userId, items) {
        return await orderRepository.createOrderTx(userId, items);
    }
}
exports.OrderService = OrderService;
