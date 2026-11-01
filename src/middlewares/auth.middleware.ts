import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthPayload {
  sub: string | number; // Дозволяємо і рядок, і число
  role: string;
}

export const authGuard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'error',
      message: 'Токен відсутній або некоректний',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (
      typeof decoded === 'string' ||
      (typeof decoded.sub !== 'string' && typeof decoded.sub !== 'number') || // Перевіряємо обидва типи
      typeof decoded.role !== 'string'
    ) {
      return res.status(401).json({
        status: 'error',
        message: 'Некоректна структура токена',
      });
    }

    const userId = Number(decoded.sub);

    if (!Number.isSafeInteger(userId)) {
      return res.status(401).json({
        status: 'error',
        message: 'Некоректний ID користувача',
      });
    }

    (req as any).user = {
      id: userId,
      role: decoded.role,
    };

    return next();
  } catch {
    return res.status(401).json({
      status: 'error',
      message: 'Токен недійсний або прострочений',
    });
  }
};