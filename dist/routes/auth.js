"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const error_1 = require("../error");
const authRouter = (0, express_1.Router)();
//for admin  authentication
authRouter.post("/admin/login", (0, error_1.errorHandler)(auth_1.adminLogin));
authRouter.post("/user/login", (0, error_1.errorHandler)(auth_1.userLogin));
exports.default = authRouter;
