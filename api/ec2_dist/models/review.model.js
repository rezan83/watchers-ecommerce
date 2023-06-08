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
const mongoose_1 = require("mongoose");
const product_model_1 = __importDefault(require("./product.model"));
const reviewSchema = new mongoose_1.Schema({
    // _id: Schema.Types.ObjectId,
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' },
    product: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Product' },
    rating: {
        type: Number,
        required: true,
    },
    comment: String,
});
reviewSchema.post('findOneAndUpdate', function (doc, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const relatedProduct = yield product_model_1.default.findById(doc.product);
        if (relatedProduct) {
            if (!!((_a = relatedProduct.reviews) === null || _a === void 0 ? void 0 : _a.length)) {
                relatedProduct.reviews = [doc._id];
            }
            else if (!relatedProduct.reviews.includes(doc._id)) {
                relatedProduct.reviews.push(doc._id);
            }
            yield relatedProduct.save();
            relatedProduct.populate('reviews').then(() => {
                relatedProduct.rating = relatedProduct.reviews.length
                    ? (relatedProduct.reviews.reduce((a, b) => {
                        return a + b.rating;
                    }, 0) +
                        doc.rating) /
                        (relatedProduct.reviews.length + 1)
                    : doc.rating;
                relatedProduct.save();
            });
        }
        next();
    });
});
const Review = (0, mongoose_1.model)('Review', reviewSchema);
exports.default = Review;
//# sourceMappingURL=review.model.js.map