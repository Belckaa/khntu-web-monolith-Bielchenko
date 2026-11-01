import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';

const productService = new ProductService();

export class ProductController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      // Отримуємо параметри пагінації з URL (наприклад: ?page=1&limit=5)
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      
      const result = await productService.getAll(page, limit);
      res.status(200).json({ status: 'success', ...result });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      // req.body вже провалідовано middleware та очищено
      const item = await productService.create(req.body);
      res.status(201).json({ status: 'success', data: item });
    } catch (error) {
      next(error);
    }
  }
}