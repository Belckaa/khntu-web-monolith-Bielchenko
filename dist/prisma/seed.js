"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Starting database seeding...', {
        dbProvider: 'postgresql-khntu',
    });
    // 1. Створюємо категорію
    const category = await prisma.category.create({
        data: {
            name: 'Електроніка',
        },
    });
    // 2. Створюємо користувача
    await prisma.user.create({
        data: {
            email: 'test@example.com',
            password: 'hashed_password_here',
        },
    });
    // 3. Створюємо товари
    await prisma.product.createMany({
        data: [
            {
                title: 'Ноутбук Dell',
                price: 30000,
                categoryId: category.id,
            },
            {
                title: 'Монітор LG 27"',
                price: 9000,
                categoryId: category.id,
            },
        ],
    });
    console.log('Seeding completed!');
}
main()
    .catch((error) => {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
})
    .finally(async () => {
    await prisma.$disconnect();
});
