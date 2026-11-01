import 'dotenv/config'; // Завантажуємо .env перед створенням клієнта
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();