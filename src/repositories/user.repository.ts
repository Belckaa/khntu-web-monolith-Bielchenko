import { prisma } from '../utils/prisma';

export class UserRepository {
  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }

  async create(data: { email: string; password: string; role?: string }) {
    return await prisma.user.create({ data });
  }
}