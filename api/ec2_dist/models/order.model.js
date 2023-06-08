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
const user_model_1 = __importDefault(require("./user.model"));
const orderSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    order_id: String,
    products: [
        {
            id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product' },
            name: String,
            price: String,
        },
    ],
    total: Number,
    buyer: {
        full_name: String,
        email: String,
    },
    address: {
        address_line_1: { type: String, required: false },
        address_line_2: { type: String, required: false },
        admin_area_1: { type: String, required: false },
        postal_code: { type: String, required: false },
        city: { type: String, required: false },
        country: String,
        lat: String,
        lng: String,
    },
});
orderSchema.post('save', function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const relatedUser = yield user_model_1.default.findById(this.user);
        relatedUser.orders = relatedUser.orders.length
            ? [...relatedUser.orders, this._id]
            : [this._id];
        relatedUser.save();
        next();
    });
});
const Order = (0, mongoose_1.model)('Order', orderSchema);
exports.default = Order;
//# sourceMappingURL=order.model.js.map