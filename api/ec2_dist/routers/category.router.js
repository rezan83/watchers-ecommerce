"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = __importDefault(require("../controllers/category.controller"));
const auth_1 = require("../middlewares/auth");
const categoriesRoute = (0, express_1.Router)();
categoriesRoute.get('/', 
// isLogedIn,
category_controller_1.default.fetchAllCategorys);
// categoriesRoute.get('/:id', isLogedIn, categoryControllers.fetchOneCategory)
// only admin
categoriesRoute.put('/', auth_1.isLogedIn, auth_1.isAddmin, category_controller_1.default.updateOneCategory);
categoriesRoute.delete('/', auth_1.isLogedIn, auth_1.isAddmin, category_controller_1.default.deleteOneCategory);
categoriesRoute.post('/', auth_1.isLogedIn, auth_1.isAddmin, category_controller_1.default.addOneCategory);
exports.default = categoriesRoute;
//# sourceMappingURL=category.router.js.map