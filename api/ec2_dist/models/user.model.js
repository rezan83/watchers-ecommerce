"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
        validate: {
            validator: (v) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/.test(v),
            message: '8 char, 1 uppercase, 1 lowercase, 1 number',
        },
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true,
        set: (v) => v.toLowerCase(),
        validate: {
            validator: (v) => /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/.test(v),
            message: 'not a valid email',
        },
    },
    phone: {
        type: Number,
        // required: true,
        min: 6,
    },
    is_verified: { type: Boolean, default: false },
    is_banned: { type: Boolean, default: false },
    is_admin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    // image: { type: String, contentType: String },
    image: { type: String, contentType: String },
    orders: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Order' }],
    cart: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Product' }]
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map