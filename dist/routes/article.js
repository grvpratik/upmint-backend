"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const error_1 = require("../error");
const article_1 = require("../controllers/article");
const articleRouter = (0, express_1.Router)();
articleRouter.post("/", [auth_1.authMiddleware], (0, error_1.errorHandler)(article_1.articlePost));
articleRouter.patch("/:slug", [auth_1.authMiddleware], (0, error_1.errorHandler)(article_1.articleUpdate));
articleRouter.delete("/:slug", [auth_1.authMiddleware], (0, error_1.errorHandler)(article_1.articleDelete));
articleRouter.get("/", (0, error_1.errorHandler)(article_1.articleGet));
articleRouter.get("/:slug", (0, error_1.errorHandler)(article_1.articleDetails));
exports.default = articleRouter;
