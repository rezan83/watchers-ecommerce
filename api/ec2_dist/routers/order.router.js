"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = __importDefault(require("../controllers/order.controller"));
const auth_1 = require("../middlewares/auth");
const categoriesRoute = (0, express_1.Router)();
categoriesRoute.get('/', auth_1.isLogedIn, order_controller_1.default.fetchAllOrders);
// categoriesRoute.get('/:id', isLogedIn, orderControllers.fetchOneOrder)
// only admin
categoriesRoute.put('/', auth_1.isLogedIn, auth_1.isAddmin, order_controller_1.default.updateOneOrder);
categoriesRoute.delete('/', auth_1.isLogedIn, auth_1.isAddmin, order_controller_1.default.deleteOneOrder);
categoriesRoute.post('/', auth_1.isLogedIn, auth_1.isAddmin, order_controller_1.default.addOneOrder);
exports.default = categoriesRoute;
//# sourceMappingURL=order.router.js.map