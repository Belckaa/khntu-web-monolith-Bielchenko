import { prisma } from '../utils/prisma';
import { AppError } from '../utils/AppError';

export class CategoryService {
  async getAll() {
    return await prisma.category.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async getById(id: number) {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new AppError('Категорію не знайдено', 404);
    }

    return category;
  }
}