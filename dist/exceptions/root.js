"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = void 0;
class HttpException extends Error {
    constructor(message, errorCode, statusCode, error) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.error = error;
    }
}
exports.default = HttpException;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["USER_NOT_FOUND"] = 1001] = "USER_NOT_FOUND";
    ErrorCode[ErrorCode["USER_ALREADY_EXISTS"] = 1002] = "USER_ALREADY_EXISTS";
    ErrorCode[ErrorCode["INCORRECT_PASSWORD"] = 1003] = "INCORRECT_PASSWORD";
    ErrorCode[ErrorCode["UNPROCESSABLE_ENTITY"] = 2001] = "UNPROCESSABLE_ENTITY";
    ErrorCode[ErrorCode["INTERNAL_EXCEPTION"] = 3001] = "INTERNAL_EXCEPTION";
    ErrorCode[ErrorCode["UNAUTHORIZED"] = 4001] = "UNAUTHORIZED";
    ErrorCode[ErrorCode["PROJECT_NOT_FOUND"] = 4000] = "PROJECT_NOT_FOUND";
    ErrorCode[ErrorCode["TAG_NOT_FOUND"] = 4003] = "TAG_NOT_FOUND";
    ErrorCode[ErrorCode["ARTICLE_NOT_FOUND"] = 4003] = "ARTICLE_NOT_FOUND";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
