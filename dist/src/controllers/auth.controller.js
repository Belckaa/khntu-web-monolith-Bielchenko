"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const authService = new auth_service_1.AuthService();
class AuthController {
    static async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await authService.register(email, password);
            res.status(201).json({ status: 'success', data: user });
        }
        catch (error) {
            next(error);
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await authService.login(email, password);
            res.status(200).json({ status: 'success', data: result });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
