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
exports.comparePass = exports.hashPass = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const salt = 10;
const hashPass = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield bcrypt_1.default.hash(password, 10);
    }
    catch (error) {
        console.log(error);
    }
});
exports.hashPass = hashPass;
const comparePass = (password, hashedPass) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield bcrypt_1.default.compare(password, hashedPass);
    }
    catch (error) {
        console.log(error);
    }
});
exports.comparePass = comparePass;
//# sourceMappingURL=bcryptPass.js.map