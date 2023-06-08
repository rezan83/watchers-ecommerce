"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = exports.cookieAge10Days = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
// import { Response } from 'express'
exports.cookieAge10Days = 10 * 24 * 60 * 60 * 1000;
// Assigning refresh token in http-only cookie
// export const setJwtRefreshToCookie = (res: Response, refreshToken: string) => {
//    res.cookie('refreshToken', refreshToken,
//   {
//     sameSite:'none',
//     httpOnly: false,
//     expires: new Date(Date.now() + cookieAge10Days),
//     secure: process.env.NODE_ENV === "production",
//   }
//   )
// }
const generateAccessToken = (payload) => {
    const secret = config_1.env.JWT_SECRET;
    const options = { expiresIn: '20min' };
    return jsonwebtoken_1.default.sign(payload, secret, options);
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload) => {
    const secret = config_1.env.JWT_REFRESH;
    const options = { expiresIn: '10d' };
    return jsonwebtoken_1.default.sign(payload, secret, options);
};
exports.generateRefreshToken = generateRefreshToken;
//# sourceMappingURL=jwtGenerator.js.map