import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { errorHandler } from './middlewares/error.middleware';
import productRoutes from './routes/product.routes';
import categoryRoutes from './routes/category.routes';

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware); // Логування запитів

// Базовий health-check (з ЛР1)
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Підключення роутів
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/categories', categoryRoutes);

// Глобальний обробник помилок (ЗАВЖДИ В КІНЦІ!)
app.use(errorHandler);

export default app;