"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_1 = require("../repositories/user.repository");
const AppError_1 = require("../utils/AppError");
const userRepository = new user_repository_1.UserRepository();
const SALT_ROUNDS = 10;
class AuthService {
    async register(email, rawPassword) {
        const existingUser = await userRepository.findByEmail(email);
        if (existingUser)
            throw new AppError_1.AppError('Користувач з таким email вже існує', 400);
        const passwordHash = await bcrypt_1.default.hash(rawPassword, SALT_ROUNDS);
        const user = await userRepository.create({ email, password: passwordHash });
        return { id: user.id, email: user.email, role: user.role };
    }
    async login(email, rawPassword) {
        const user = await userRepository.findByEmail(email);
        if (!user)
            throw new AppError_1.AppError('Невірний email або пароль', 401);
        const isValid = await bcrypt_1.default.compare(rawPassword, user.password);
        if (!isValid)
            throw new AppError_1.AppError('Невірний email або пароль', 401);
        const token = jsonwebtoken_1.default.sign({ sub: user.id, role: user.role, authPolicy: 'khntu-rbac-v1' }, process.env.JWT_SECRET, { expiresIn: '15m' });
        return { token, user: { id: user.id, email: user.email, role: user.role } };
    }
}
exports.AuthService = AuthService;
