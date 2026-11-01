"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
const loggerMiddleware = (req, res, next) => {
    // Додаємо кастомний заголовок до всіх відповідей
    res.setHeader('X-Framework-Check', 'v2.0.18');
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    next();
};
exports.loggerMiddleware = loggerMiddleware;
