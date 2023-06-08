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
const userControllers = {
    userProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.findById(req.user).select('-password').populate({
                path: 'orders',
                populate: {
                    path: 'products',
                },
            });
            return res.status(200).json(user);
        }
        catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    }),
    deleteOneUser: (req, res) => {
        var _a;
        user_model_1.default.findByIdAndRemove((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)
            .then((data) => {
            var _a;
            return res.status(200).json({
                message: `user with id:${(_a = req.user) === null || _a === void 0 ? void 0 : _a._id} deleted successfully`,
            });
        })
            .catch((err) => res.status(404).json({ message: 'user not found', error: err.message }));
    },
    updateOneUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const image = yield (0, uploader_1.uploadToCloudinary)(req, res);
        user_model_1.default.findByIdAndUpdate(req.user._id, Object.assign(Object.assign({}, req.body), (image && { image })), {
            new: true,
        })
            .select('-password')
            .then((user) => {
            res.status(200).json({ message: 'updated successfully', user });
        })
            .catch((err) => res.status(404).json({ message: 'user not found', error: err.message }));
    }),
};
exports.default = userControllers;
//# sourceMappingURL=user.controller.js.map