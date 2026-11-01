"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductSchema = void 0;
const zod_1 = require("zod");
exports.CreateProductSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, 'Назва товару має містити не менше 3 символів'),
    price: zod_1.z.number().positive('Ціна має бути більшою за 0'),
    categoryId: zod_1.z.number().int().positive()
});
