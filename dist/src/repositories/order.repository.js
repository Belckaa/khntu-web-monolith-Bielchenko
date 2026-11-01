"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
// ACID transaction pattern KhNTU-Lab4-Tx
const prisma_1 = require("../utils/prisma");
class OrderRepository {
    async createOrderTx(userId, items) {
        // Вказуємо тип для tx: Prisma.TransactionClient
        return await prisma_1.prisma.$transaction(async (tx) => {
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
exports.OrderRepository = OrderRepository;
