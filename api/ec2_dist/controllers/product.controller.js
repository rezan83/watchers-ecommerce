"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("../models/product.model"));
const uploader_1 = require("../middlewares/uploader");
const productControllers = {
    fetchAllProducts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // { categories: {$in: [id1 , id2]}}
        const { limit = 0, page = 1, createdAt, minPrice = 0, maxPrice, searchName = '', searchCategories, } = req.query;
        const searchNameRgx = new RegExp(searchName, 'i');
        const filters = Object.assign(Object.assign({}, (searchCategories && {
            categories: {},
        })), { price: Object.assign({ $gte: minPrice }, (maxPrice && { $lte: maxPrice })), $or: [
                { name: { $regex: searchNameRgx } },
                { description: { $regex: searchNameRgx } },
            ] });
        if (searchCategories) {
            if (Array.isArray(searchCategories)) {
                filters.categories = { $in: [...searchCategories] };
            }
            else {
                filters.categories = { $in: [searchCategories] };
            }
        }
        const pages = !limit
            ? null
            : Math.ceil((yield product_model_1.default.countDocuments(filters)) / +limit);
        const next = pages === null ? false : +page < pages;
        product_model_1.default.find(filters)
            .limit(+limit)
            .skip((+page - 1) * +limit)
            .sort({ createdAt: createdAt })
            .then((products) => {
            return pages
                ? res.json({
                    page: +page,
                    pages,
                    next,
                    products,
                })
                : res.json({ products });
        })
            .catch((err) => res
            .status(404)
            .json({ message: 'products not found', error: err.message }));
    }),
    getFeatured: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        product_model_1.default.find({ featured: true })
            .then((products) => {
            return res.status(200).json({ products });
        })
            .catch((err) => res
            .status(404)
            .json({ message: 'products not found', error: err.message }));
    }),
    addOneProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const image = yield (0, uploader_1.uploadToCloudinary)(req, res);
        try {
            const newProduct = new product_model_1.default(Object.assign({ createdBy: String((_a = req.user) === null || _a === void 0 ? void 0 : _a._id), image }, req.body));
            yield newProduct.save();
            res
                .status(201)
                .json({ message: 'Product Created successfully', product: newProduct });
        }
        catch (err) {
            res.status(500).json({ message: err.message, error: err });
        }
    }),
    fetchOneProduct: (req, res) => {
        product_model_1.default.findById(req.params.id)
            .then((product) => res.status(200).json(product))
            .catch((err) => res
            .status(404)
            .json({ message: 'product not found', error: err.message }));
    },
    fetchAvailableProducts: (req, res) => {
        const { ids } = req.body;
        product_model_1.default.find({ _id: { $in: ids } })
            .then((products) => {
            return res.status(200).json(products);
        })
            .catch((err) => res
            .status(404)
            .json({ message: 'products not found', error: err.message }));
    },
    deleteOneProduct: (req, res) => {
        product_model_1.default.findByIdAndRemove(req.params.id)
            .then((data) => res.status(200).json({
            message: `product with id:${req.params.id} deleted successfully`,
        }))
            .catch((err) => res
            .status(404)
            .json({ message: 'product not found', error: err.message }));
    },
    updateOneProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const image = yield (0, uploader_1.uploadToCloudinary)(req, res);
        try {
            yield product_model_1.default.findByIdAndUpdate(req.params.id, Object.assign(Object.assign({}, (image && { image })), req.body), { new: true })
                .then((product) => res.status(200).json({ message: 'updated successfully', product }))
                .catch((err) => res
                .status(404)
                .json({ message: 'product not found', error: err.message }));
        }
        catch (err) {
            res.status(500).json({ message: err.message, error: err });
        }
        // Product.findByIdAndUpdate(req.params.id, req.body)
        //   .then((data) =>
        //     res.status(200).json({ message: 'updated successfully', data })
        //   )
        //   .catch((err) =>
        //     res
        //       .status(404)
        //       .json({ message: 'product not found', error: err.message })
        //   )
    }),
};
exports.default = productControllers;
// Products
// Have different attributes: ID, name, description, categories, variants, sizes
// Get list of all products with/without pagination
// Get list of products, filtering (search) by: name, categories, variant
// Get a product by ID
// Admin:
// Add a new product, update info of a product, remove a product
// Ban a user, unban a user
// Sign up a new user (username, password, first name, last name, email)
// Sign in user with username/password
// Update user profile (first name, last name, email)
// Forget password request
// Change password (username, old password, new password)
//# sourceMappingURL=product.controller.js.map