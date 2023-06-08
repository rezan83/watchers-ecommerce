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
exports.isAddmin = exports.isLogedIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const user_model_1 = __importDefault(require("../models/user.model"));
const isLogedIn = (req, res, next) => {
    var _a;
    try {
        if (req.headers.authorization || req.headers.Authorization) {
            const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || '';
            jsonwebtoken_1.default.verify(token, config_1.env.JWT_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
                const { email } = decoded;
                const user = yield user_model_1.default.findOne({ email }).select('-password');
                req.user = user;
                next();
            }));
        }
        else if (config_1.env.ENV === 'DEV') {
            const user = {
                _id: '64403213fd5bec939734c6a0',
                name: 'Rezan',
                is_admin: true,
                password: 'testtest',
                email: 'test@test.com',
                is_verified: true,
                is_banned: false,
                createdAt: new Date(),
            };
            req.user = user;
            next();
        }
        else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'something went wrong' });
    }
};
exports.isLogedIn = isLogedIn;
const isAddmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user && req.user.is_admin) {
            next();
        }
        else {
            return res
                .status(403)
                .json({ message: "unauthorized, don't have privilage" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'something went wrong' });
    }
});
exports.isAddmin = isAddmin;
//# sourceMappingURL=auth.js.map