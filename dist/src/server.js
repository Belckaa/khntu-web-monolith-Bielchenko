"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config"); // <-- ЦЕ МАЄ БУТИ НАЙПЕРШИМ РЯДКОМ
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 3000;
app_1.default.listen(PORT, () => {
    console.log(`🚀 [Server]: Server is running at http://localhost:${PORT}`);
    console.log(`🏥 [Health Check]: http://localhost:${PORT}/api/v1/health`);
});
