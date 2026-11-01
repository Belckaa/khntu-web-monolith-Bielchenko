"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const product_dto_1 = require("../dto/product.dto");
const auth_middleware_1 = require("../middlewares/auth.middleware"); // <-- ДОДАНО
const role_middleware_1 = require("../middlewares/role.middleware"); // <-- ДОДАНО
const router = (0, express_1.Router)();
// Публічний ендпоінт
router.get('/', product_controller_1.ProductController.getAll);
// Захищені ендпоінти тільки для ADMIN
router.post('/', auth_middleware_1.authGuard, (0, role_middleware_1.roleGuard)(['ADMIN']), (0, validate_middleware_1.validateBody)(product_dto_1.CreateProductSchema), product_controller_1.ProductController.create);
router.delete('/:id', auth_middleware_1.authGuard, (0, role_middleware_1.roleGuard)(['ADMIN']), product_controller_1.ProductController.delete); // Якщо у вас ще немає методу delete, додайте його в контролер/сервіс/репозиторій.
exports.default = router;
