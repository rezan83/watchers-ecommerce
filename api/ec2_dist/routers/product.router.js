"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const auth_1 = require("../middlewares/auth");
// import { upload, uploadToCloudinary } from '../middlewares/uploader'
const productsRoute = (0, express_1.Router)();
productsRoute.get('/', 
// isLogedIn,
product_controller_1.default.fetchAllProducts);
productsRoute.get('/featured', 
// isLogedIn,
product_controller_1.default.getFeatured);
// array og products ids in body
productsRoute.post('/available', auth_1.isLogedIn, product_controller_1.default.fetchAvailableProducts);
productsRoute.get('/:id', auth_1.isLogedIn, product_controller_1.default.fetchOneProduct);
// only admin
productsRoute.put('/:id', auth_1.isLogedIn, auth_1.isAddmin, 
// upload.single('image'),
// uploadToCloudinary,
product_controller_1.default.updateOneProduct);
productsRoute.delete('/:id', auth_1.isLogedIn, auth_1.isAddmin, product_controller_1.default.deleteOneProduct);
productsRoute.post('/', auth_1.isLogedIn, auth_1.isAddmin, 
// upload.single('image'),
// uploadToCloudinary,
product_controller_1.default.addOneProduct);
exports.default = productsRoute;
//# sourceMappingURL=product.router.js.map