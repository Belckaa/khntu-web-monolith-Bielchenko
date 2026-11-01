"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const prisma_1 = require("../utils/prisma");
const AppError_1 = require("../utils/AppError");
class CategoryService {
    async getAll() {
        return await prisma_1.prisma.category.findMany({
            orderBy: { id: 'asc' },
        });
    }
    async getById(id) {
        const category = await prisma_1.prisma.category.findUnique({
            where: { id },
        });
        if (!category) {
            throw new AppError_1.AppError('Категорію не знайдено', 404);
        }
        return category;
    }
}
exports.CategoryService = CategoryService;
