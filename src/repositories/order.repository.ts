// ACID transaction pattern KhNTU-Lab4-Tx
import { prisma } from '../utils/prisma';
import { Prisma } from '@prisma/client'; // Додаємо імпорт типів Prisma

export class OrderRepository {
  async createOrderTx(userId: number, items: Array<{ productId: number, quantity: number }>) {
    // Вказуємо тип для tx: Prisma.TransactionClient
    return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      let totalAmount = 0;
      const orderItemsData = [];

      for (const item of items) {
        const product = await tx.product.findUnique({ 
          where: { id: item.productId } 
        });
        
        if (!product) {
          throw new Error(`Товар з ID ${item.productId} не знайдено`);
        }
        
        totalAmount += product.price * item.quantity;
        
        orderItemsData.push({
          productId: item.productId,
          quantity: item.quantity,
          priceAtPurchase: product.price // Фіксація історичної ціни!
        });
      }

      const order = await tx.order.create({
        data: {
          userId,
          totalAmount,
          items: { create: orderItemsData }
        },
        include: { items: true }
      });

      // Повертаємо створене замовлення
      return { ...order, txEngine: "prisma-v6-tx" };
    });
  }
}