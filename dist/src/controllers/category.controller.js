"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_service_1 = require("../services/category.service");
const categoryService = new category_service_1.CategoryService();
class CategoryController {
    static getAll(req, res) {
        const items = categoryService.getAll();
        res.status(200).json({ status: 'success', data: items });
    }
    static getById(req, res, next) {
        try {
            const id = Number(req.params.id);
            const item = categoryService.getById(id);
            res.status(200).json({ status: 'success', data: item });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CategoryController = CategoryController;
