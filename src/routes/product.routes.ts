import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { validateBody } from '../middlewares/validate.middleware';
import { CreateProductSchema } from '../dto/product.dto';

const router = Router();

router.get('/', ProductController.getAll);
router.post('/', validateBody(CreateProductSchema), ProductController.create);

export default router;