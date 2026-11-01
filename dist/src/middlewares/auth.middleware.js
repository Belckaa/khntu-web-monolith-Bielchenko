"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authGuard = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({
            status: 'error',
            message: 'Токен відсутній або некоректний',
        });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === 'string' ||
            (typeof decoded.sub !== 'string' && typeof decoded.sub !== 'number') || // Перевіряємо обидва типи
            typeof decoded.role !== 'string') {
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
        req.user = {
            id: userId,
            role: decoded.role,
        };
        return next();
    }
    catch {
        return res.status(401).json({
            status: 'error',
            message: 'Токен недійсний або прострочений',
        });
    }
};
exports.authGuard = authGuard;
