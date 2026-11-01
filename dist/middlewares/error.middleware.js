"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = require("../utils/AppError");
const errorHandler = (err, req, res, next) => {
    const statusCode = err instanceof AppError_1.AppError ? err.statusCode : 500;
    const message = err.message || 'Внутрішня помилка сервера';
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message
    });
};
exports.errorHandler = errorHandler;
