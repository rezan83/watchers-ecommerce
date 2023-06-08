"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = __importDefault(require("../controllers/admin.controller"));
const auth_1 = require("../middlewares/auth");
const adminRoute = (0, express_1.Router)();
adminRoute.get('/all-users', auth_1.isLogedIn, auth_1.isAddmin, admin_controller_1.default.fetchAllUsers);
adminRoute.get('/:id', auth_1.isLogedIn, auth_1.isAddmin, admin_controller_1.default.fetchOneUser);
adminRoute.get('/', auth_1.isLogedIn, auth_1.isAddmin, admin_controller_1.default.admin);
adminRoute.delete('/:id', auth_1.isLogedIn, auth_1.isAddmin, admin_controller_1.default.deleteOneUser);
adminRoute.put('/:id', auth_1.isLogedIn, auth_1.isAddmin, admin_controller_1.default.updateOneUser);
adminRoute.put('/ban/:id', auth_1.isLogedIn, auth_1.isAddmin, admin_controller_1.default.banUser);
adminRoute.put('/unban/:id', auth_1.isLogedIn, auth_1.isAddmin, admin_controller_1.default.unbanUser);
exports.default = adminRoute;
//# sourceMappingURL=admin.router.js.map