"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleGuard = void 0;
const roleGuard = (allowedRoles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !allowedRoles.includes(user.role)) {
            return res.status(403).json({
                status: 'error',
                message: 'Недостатньо прав для виконання цієї операції'
            });
        }
        next();
    };
};
exports.roleGuard = roleGuard;
