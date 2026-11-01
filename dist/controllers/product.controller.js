"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("../services/product.service");
const productService = new product_service_1.ProductService();
class ProductController {
    static getAll(req, res) {
        const items = productService.getAll();
        res.status(200).json({ status: 'success', data: items });
    }
    static getById(req, res, next) {
        try {
            const id = Number(req.params.id);
            const item = productService.getById(id);
            res.status(200).json({ status: 'success', data: item });
        }
        catch (error) {
            next(error); // Передаємо помилку в errorHandler
        }
    }
}
exports.ProductController = ProductController;
