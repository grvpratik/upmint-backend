"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestsException = void 0;
const root_1 = __importDefault(require("./root"));
class BadRequestsException extends root_1.default {
    constructor(message, errorCode, error) {
        super(message, errorCode, 400, error);
    }
}
exports.BadRequestsException = BadRequestsException;
