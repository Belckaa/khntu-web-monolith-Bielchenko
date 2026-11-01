"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_repository_1 = require("../repositories/product.repository");
const productRepository = new product_repository_1.ProductRepository();
class ProductService {
    async getAll(page, limit) {
        return await productRepository.findPaginated(page, limit);
    }
    async create(data) {
        return await productRepository.create(data);
    }
    async delete(id) {
        return await productRepository.delete(id);
    }
}
exports.ProductService = ProductService;
