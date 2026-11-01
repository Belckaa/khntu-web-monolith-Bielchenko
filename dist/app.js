"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const logger_middleware_1 = require("./middlewares/logger.middleware");
const error_middleware_1 = require("./middlewares/error.middleware");
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(logger_middleware_1.loggerMiddleware); // Логування запитів
// Базовий health-check (з ЛР1)
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});
// Підключення роутів
app.use('/api/v1/products', product_routes_1.default);
app.use('/api/v1/categories', category_routes_1.default);
// Глобальний обробник помилок (ЗАВЖДИ В КІНЦІ!)
app.use(error_middleware_1.errorHandler);
exports.default = app;
