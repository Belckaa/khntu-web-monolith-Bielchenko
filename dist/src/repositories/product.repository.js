"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const prisma_1 = require("../utils/prisma");
const library_1 = require("@prisma/client/runtime/library");
class ProductRepository {
    async findPaginated(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            prisma_1.prisma.product.findMany({
                skip,
                take: limit,
                orderBy: { id: 'desc' },
            }),
            prisma_1.prisma.product.count(),
        ]);
        return {
            items,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }
    async create(data) {
        try {
            return await prisma_1.prisma.product.create({ data });
        }
        catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    }
    async delete(id) {
        try {
            return await prisma_1.prisma.product.delete({ where: { id } });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new Error('Товар не знайдено');
            }
            throw error;
        }
    }
}
exports.ProductRepository = ProductRepository;
