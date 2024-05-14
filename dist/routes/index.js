"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const project_1 = __importDefault(require("./project"));
const uplaod_1 = require("./uplaod");
const article_1 = __importDefault(require("./article"));
const rootRouter = (0, express_1.Router)();
//For admin user & normal user
rootRouter.use('/auth', auth_1.default);
//For general user
rootRouter.use('/projects', project_1.default);
//For blog posts
rootRouter.use("/articles", article_1.default);
//for image upload
rootRouter.use("/uploads", uplaod_1.uploadRouter);
exports.default = rootRouter;
