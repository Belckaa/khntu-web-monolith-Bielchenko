import { AppError } from '../utils/AppError';

export class CategoryService {
  private categories = [
    { id: 1, title: 'Електроніка' },
    { id: 2, title: 'Побутова техніка' }
  ];

  getAll() { 
    return this.categories; 
  }

  getById(id: number) {
    const category = this.categories.find(c => c.id === id);
    if (!category) throw new AppError('Категорію не знайдено', 404);
    return category;
  }
}