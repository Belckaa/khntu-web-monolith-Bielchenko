"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const AppError_1 = require("../utils/AppError");
class ProductService {
    products = [
        { id: 1, title: 'Ноутбук Lenovo', price: 25000, categoryId: 1 },
        { id: 2, title: 'Смартфон Samsung', price: 15000, categoryId: 1 }
    ];
    getAll() {
        return this.products;
    }
    getById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product)
            throw new AppError_1.AppError('Товар не знайдено', 404);
        return product;
    }
}
exports.ProductService = ProductService;
