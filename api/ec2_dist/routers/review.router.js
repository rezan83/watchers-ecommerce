"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_controller_1 = __importDefault(require("../controllers/review.controller"));
const auth_1 = require("../middlewares/auth");
const veviewsRoute = (0, express_1.Router)();
veviewsRoute.post('/', auth_1.isLogedIn, review_controller_1.default.addOrUpdateReview);
veviewsRoute.get('/:id', auth_1.isLogedIn, review_controller_1.default.fetchOneReview);
veviewsRoute.get('/', auth_1.isLogedIn, review_controller_1.default.fetchAllReviews);
// veviewsRoute.get('/:id', isLogedIn, reviewControllers.fetchOneReview)
// only admin
veviewsRoute.put('/', auth_1.isLogedIn, review_controller_1.default.updateOneReview);
veviewsRoute.delete('/', auth_1.isLogedIn, review_controller_1.default.deleteOneReview);
exports.default = veviewsRoute;
//# sourceMappingURL=review.router.js.map