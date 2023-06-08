"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = __importDefault(require("../helpers/apiError"));
const logger_1 = __importDefault(require("../util/logger"));
function default_1(error, req, res, next) {
    if (error instanceof apiError_1.default) {
        if (error.source) {
            logger_1.default.error(error.source);
        }
        return res.status(error.statusCode).json({
            status: 'error',
            statusCode: error.statusCode,
            message: error.message,
        });
    }
    else {
        return res.status(400).json({
            status: 'error',
            statusCode: 400,
            message: error.message,
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=apiErrorHandler.js.map