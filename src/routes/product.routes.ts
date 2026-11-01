import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { validateBody } from '../middlewares/validate.middleware';
import { CreateProductSchema } from '../dto/product.dto';
import { authGuard } from '../middlewares/auth.middleware'; // <-- ДОДАНО
import { roleGuard } from '../middlewares/role.middleware'; // <-- ДОДАНО

const router = Router();

// Публічний ендпоінт
router.get('/', ProductController.getAll);

// Захищені ендпоінти тільки для ADMIN
router.post('/', authGuard, roleGuard(['ADMIN']), validateBody(CreateProductSchema), ProductController.create);
router.delete('/:id', authGuard, roleGuard(['ADMIN']), ProductController.delete); // Якщо у вас ще немає методу delete, додайте його в контролер/сервіс/репозиторій.

export default router;