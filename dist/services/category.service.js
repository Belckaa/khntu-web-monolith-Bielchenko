"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const AppError_1 = require("../utils/AppError");
class CategoryService {
    categories = [
        { id: 1, title: 'Електроніка' },
        { id: 2, title: 'Побутова техніка' }
    ];
    getAll() {
        return this.categories;
    }
    getById(id) {
        const category = this.categories.find(c => c.id === id);
        if (!category)
            throw new AppError_1.AppError('Категорію не знайдено', 404);
        return category;
    }
}
exports.CategoryService = CategoryService;
