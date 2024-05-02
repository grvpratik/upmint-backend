import { Router } from "express";
import { errorHandler } from "../error";
import { projectsDelete, projectsGet, projectsPatch, projectsPost, projectsSearch } from "../controllers/project";
import { authMiddleware } from "../middleware/auth";

const projectRouter: Router = Router();

projectRouter.get("/", errorHandler(projectsGet));

projectRouter.get("/search", errorHandler(projectsSearch));


projectRouter.post("/",[authMiddleware], errorHandler(projectsPost));
projectRouter.patch("/:id", [authMiddleware], errorHandler(projectsPatch));
projectRouter.delete("/:id", [authMiddleware], errorHandler(projectsDelete));

export default projectRouter;
