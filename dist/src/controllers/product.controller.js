"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("../services/product.service");
const productService = new product_service_1.ProductService();
class ProductController {
    static async getAll(req, res, next) {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const result = await productService.getAll(page, limit);
            res.status(200).json({ status: 'success', ...result });
        }
        catch (error) {
            next(error);
        }
    }
    static async create(req, res, next) {
        try {
            const item = await productService.create(req.body);
            res.status(201).json({ status: 'success', data: item });
        }
        catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const id = Number(req.params.id);
            await productService.delete(id);
            res.status(200).json({ status: 'success', message: 'Товар успішно видалено' });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ProductController = ProductController;
