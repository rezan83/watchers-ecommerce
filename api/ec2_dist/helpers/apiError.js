"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = exports.UnauthorizedError = exports.InternalServerError = exports.ForbiddenError = exports.NotFoundError = void 0;
class ApiError extends Error {
    constructor(statusCode, message, source) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.source = source;
    }
}
exports.default = ApiError;
class NotFoundError extends ApiError {
    constructor(message = 'Not Found', statusCode = 404, source) {
        super(statusCode, message, source);
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.NotFoundError = NotFoundError;
class ForbiddenError extends ApiError {
    constructor(message = 'Forbidden', statusCode = 403, source) {
        super(statusCode, message, source);
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.ForbiddenError = ForbiddenError;
class InternalServerError extends ApiError {
    constructor(message = 'Internal Server Error', statusCode = 500, source) {
        super(statusCode, message, source);
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.InternalServerError = InternalServerError;
class UnauthorizedError extends ApiError {
    constructor(message = 'Unauthorized Request', statusCode = 401, source) {
        super(statusCode, message, source);
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.UnauthorizedError = UnauthorizedError;
class BadRequestError extends ApiError {
    constructor(message = 'Bad Request', statusCode = 400, source) {
        super(statusCode, message, source);
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=apiError.js.map