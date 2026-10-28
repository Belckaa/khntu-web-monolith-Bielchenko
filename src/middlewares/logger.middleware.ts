import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Додаємо кастомний заголовок до всіх відповідей
  res.setHeader('X-Framework-Check', 'v2.0.18');
  
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
};