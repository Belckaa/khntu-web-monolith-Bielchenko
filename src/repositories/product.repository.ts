import { prisma } from '../utils/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class ProductRepository {
  async findPaginated(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const [items, total] = await Promise.all([
      prisma.product.findMany({
        skip,
        take: limit,
        orderBy: { id: 'desc' },
      }),
      prisma.product.count(),
    ]);

    return {
      items,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async create(data: { title: string; price: number; categoryId: number }) {
    try {
      return await prisma.product.create({ data });
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async delete(id: number) {
    try {
      return await prisma.product.delete({ where: { id } });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new Error('Товар не знайдено');
      }
      throw error;
    }
  }
}