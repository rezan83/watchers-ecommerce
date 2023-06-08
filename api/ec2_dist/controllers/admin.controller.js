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
const user_model_1 = __importDefault(require("../models/user.model"));
const uploader_1 = require("../middlewares/uploader");
const adminControllers = {
    fetchAllUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { limit = 0, page = 1, title } = req.query;
        const pages = !limit
            ? null
            : Math.ceil((yield user_model_1.default.countDocuments({})) / +limit);
        const next = pages === null ? false : +page < pages;
        user_model_1.default.find()
            .limit(+limit)
            .skip((+page - 1) * +limit)
            .sort({ title: title })
            .then((users) => {
            pages
                ? res.status(200).json({
                    page: +page,
                    pages,
                    next,
                    users,
                })
                : res.status(200).json(users);
        })
            .catch((err) => res.status(404).json({ message: 'users not found', error: err.message }));
    }),
    fetchOneUser: (req, res) => {
        user_model_1.default.findById(req.params.id)
            .then((user) => res.status(200).json(user))
            .catch((err) => res.status(404).json({ message: 'user not found', error: err.message }));
    },
    admin: (req, res) => {
        try {
            return res.status(200).json({
                message: 'Admin returned',
            });
        }
        catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },
    deleteOneUser: (req, res) => {
        user_model_1.default.findByIdAndRemove(req.params.id)
            .then((data) => res.status(200).json({
            message: `user with id:${req.params.id} deleted successfully`,
        }))
            .catch((err) => res.status(404).json({ message: 'user not found', error: err.message }));
    },
    updateOneUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const image = yield (0, uploader_1.uploadToCloudinary)(req, res);
        user_model_1.default.findByIdAndUpdate(req.params.id, Object.assign(Object.assign({}, req.body), (image && { image })), {
            new: true,
        }).select('-password')
            .then((user) => {
            res.status(200).json({ message: 'updated successfully', user });
        })
            .catch((err) => res.status(404).json({ message: 'user not found', error: err.message }));
    }),
    banUser: (req, res) => {
        user_model_1.default.findByIdAndUpdate(req.params.id, { is_banned: true }, { new: true })
            .then((user) => res.status(200).json({ message: 'banned successfully', user }))
            .catch((err) => res.status(404).json({ message: 'user not found', error: err.message }));
    },
    unbanUser: (req, res) => {
        user_model_1.default.findByIdAndUpdate(req.params.id, { is_banned: false }, { new: true })
            .then((user) => res.status(200).json({ message: 'ubanned successfully', user }))
            .catch((err) => res.status(404).json({ message: 'user not found', error: err.message }));
    },
};
exports.default = adminControllers;
//# sourceMappingURL=admin.controller.js.map