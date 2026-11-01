"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const validateBody = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                status: 'error',
                message: 'Помилка валідації вхідних даних',
                errors: result.error.issues.map(e => ({
                    field: e.path.join('.'),
                    message: e.message
                }))
            });
        }
        req.body = result.data; // Замінюємо тіло запиту очищеними та валідованими даними
        next();
    };
};
exports.validateBody = validateBody;
