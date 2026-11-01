import { prisma } from '../utils/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class ProductRepository {
  async findPaginated(page: number = 1, limit: number = 10) {
    if (page < 1 || limit < 1) {
      throw new Error('Page and limit must be greater than 0');
    }

    const skip = (page - 1) * limit;

    try {
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
    } catch (error: unknown) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async create(data: {
    title: string;
    price: number;
    categoryId: number;
  }) {
    try {
      return await prisma.product.create({
        data,
      });
    } catch (error: unknown) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2021'
      ) {
        throw new Error(
          'Таблица Product не существует. Примените миграции Prisma.'
        );
      }

      console.error('Error creating product:', error);
      throw error;
    }
  }
}