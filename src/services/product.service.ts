import { ProductRepository } from '../repositories/product.repository';

const productRepository = new ProductRepository();

export class ProductService {
  async getAll(page: number, limit: number) {
    return await productRepository.findPaginated(page, limit);
  }

  async create(data: { title: string; price: number; categoryId: number }) {
    return await productRepository.create(data);
  }

  async delete(id: number) {
    return await productRepository.delete(id);
  }
}