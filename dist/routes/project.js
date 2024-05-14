"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const error_1 = require("../error");
const project_1 = require("../controllers/project");
const auth_1 = require("../middleware/auth");
const projectRouter = (0, express_1.Router)();
// projectRouter.get("/", errorHandler(projectsGet));
projectRouter.get("/", (0, error_1.errorHandler)(project_1.projectsSearch));
projectRouter.get("/tags", (0, error_1.errorHandler)(project_1.tagsList));
projectRouter.get("/tags/:name", (0, error_1.errorHandler)(project_1.projectsByTag));
projectRouter.get("/:slug", (0, error_1.errorHandler)(project_1.projectsDetails));
projectRouter.post("/", [auth_1.authMiddleware], (0, error_1.errorHandler)(project_1.projectsPost));
projectRouter.patch("/:slug", [auth_1.authMiddleware], (0, error_1.errorHandler)(project_1.projectsPatch));
projectRouter.delete("/:slug", [auth_1.authMiddleware], (0, error_1.errorHandler)(project_1.projectsDelete));
exports.default = projectRouter;