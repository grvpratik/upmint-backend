"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testSechema = exports.AdminUserSchema = void 0;
const zod_1 = require("zod");
exports.AdminUserSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string().min(6),
});
exports.testSechema = zod_1.z.object({
    name: zod_1.z.string()
});
