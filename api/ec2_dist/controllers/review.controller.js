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
const review_model_1 = __importDefault(require("../models/review.model"));
const reviewControllers = {
    fetchAllReviews: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        review_model_1.default.find()
            .then((reviews) => {
            return res.status(200).json(reviews);
        })
            .catch((err) => res
            .status(404)
            .json({ message: 'reviews not found', error: err.message }));
    }),
    addOrUpdateReview: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // { upsert: true, new:true }
        try {
            const { product } = req.body;
            const review = yield review_model_1.default.findOneAndUpdate({ user: req.user._id, product }, Object.assign({ user: req.user._id }, req.body), { upsert: true, new: true });
            return res.status(201).json({
                message: `${
                // review.modifiedCount ? 'updated' : 'add'
                'updated'} review successfully`,
                review,
            });
        }
        catch (err) {
            return res
                .status(404)
                .json({ message: 'review not found', error: err.message });
        }
    }),
    fetchOneReview: (req, res) => {
        review_model_1.default.findOne({ user: req.user._id, product: req.params.id })
            .then((review) => res.status(200).json(review))
            .catch((err) => res
            .status(404)
            .json({ message: 'review not found', error: err.message }));
    },
    deleteOneReview: (req, res) => {
        review_model_1.default.findByIdAndRemove(req.params.id)
            .then((data) => res.status(200).json({
            message: `review with id:${req.params.id} deleted successfully`,
        }))
            .catch((err) => res
            .status(404)
            .json({ message: 'review not found', error: err.message }));
    },
    updateOneReview: (req, res) => {
        review_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then((review) => res.status(200).json({ message: 'updated successfully', review }))
            .catch((err) => res
            .status(404)
            .json({ message: 'review not found', error: err.message }));
    },
};
exports.default = reviewControllers;
//# sourceMappingURL=review.controller.js.map