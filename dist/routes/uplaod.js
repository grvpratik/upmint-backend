"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const error_1 = require("../error");
const upload_1 = require("../controllers/upload");
exports.uploadRouter = (0, express_1.Router)();
exports.uploadRouter.post('/image', [auth_1.authMiddleware], (0, error_1.errorHandler)(upload_1.imageUpload));
