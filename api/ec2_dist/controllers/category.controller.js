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
const category_model_1 = __importDefault(require("../models/category.model"));
const categoryControllers = {
    fetchAllCategorys: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        category_model_1.default.find()
            .then((categories) => {
            return res.status(200).json(categories);
        })
            .catch((err) => res
            .status(404)
            .json({ message: 'categories not found', error: err.message }));
    }),
    addOneCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const category = new category_model_1.default(req.body);
            yield category.save();
            res.status(201).json({ message: 'updated successfully', category });
        }
        catch (err) {
            res
                .status(404)
                .json({ message: 'category not found', error: err.message });
        }
    }),
    //   fetchOneCategory: (req: Request, res: Response) => {
    //     Category.findById(req.params.id)
    //       .then((category) => res.status(200).json(category))
    //       .catch((err) =>
    //         res
    //           .status(404)
    //           .json({ message: 'category not found', error: err.message })
    //       )
    //   },
    deleteOneCategory: (req, res) => {
        category_model_1.default.findByIdAndRemove(req.params.id)
            .then((data) => res.status(200).json({
            message: `category with id:${req.params.id} deleted successfully`,
        }))
            .catch((err) => res
            .status(404)
            .json({ message: 'category not found', error: err.message }));
    },
    updateOneCategory: (req, res) => {
        category_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then((category) => res.status(200).json({ message: 'updated successfully', category }))
            .catch((err) => res
            .status(404)
            .json({ message: 'category not found', error: err.message }));
    },
};
exports.default = categoryControllers;
//# sourceMappingURL=category.controller.js.map