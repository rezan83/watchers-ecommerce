"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    categories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Category' }],
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    image: { type: String, contentType: String },
    featured: { type: Boolean, default: false },
    reviews: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Review' }],
    rating: { type: Number, default: 0 },
}, { toJSON: { virtuals: true } });
productSchema.virtual('reviews_count').get(function () {
    var _a;
    return ((_a = this.reviews) === null || _a === void 0 ? void 0 : _a.length) || 0;
});
const Product = (0, mongoose_1.model)('Product', productSchema);
exports.default = Product;
//# sourceMappingURL=product.model.js.map