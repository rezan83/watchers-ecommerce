"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_1 = require("../middlewares/auth");
const usersRoute = (0, express_1.Router)();
usersRoute.put('/', auth_1.isLogedIn, user_controller_1.default.updateOneUser);
usersRoute.delete('/', auth_1.isLogedIn, user_controller_1.default.deleteOneUser);
usersRoute.post('/profile', auth_1.isLogedIn, user_controller_1.default.userProfile);
exports.default = usersRoute;
//# sourceMappingURL=user.router.js.map