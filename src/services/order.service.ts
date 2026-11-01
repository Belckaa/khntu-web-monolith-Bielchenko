import { OrderRepository } from '../repositories/order.repository';

const orderRepository = new OrderRepository();

export class OrderService {
  async createOrder(userId: number, items: Array<{ productId: number, quantity: number }>) {
    return await orderRepository.createOrderTx(userId, items);
  }
}