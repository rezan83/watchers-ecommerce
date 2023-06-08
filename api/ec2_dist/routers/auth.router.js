"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const authRoute = (0, express_1.Router)();
authRoute.post('/register', auth_controller_1.default.registerUser);
authRoute.post('/login', auth_controller_1.default.loginUser);
authRoute.post('/refresh', auth_controller_1.default.refreshUser);
authRoute.post('/logout', auth_controller_1.default.logoutUser);
authRoute.post('/forget-password', auth_controller_1.default.forgetPassword);
authRoute.get('/verify/:token', auth_controller_1.default.verifyUser);
authRoute.get('/verify-password/:token', auth_controller_1.default.verifyPassword);
exports.default = authRoute;
//# sourceMappingURL=auth.router.js.map