import { Router } from "express";
import { errorHandler } from "../error";
import { tagsList, projectsDelete,  projectsPatch, projectsPost, projectsSearch, tagProjectList } from "../controllers/project";
import { authMiddleware } from "../middleware/auth";

const projectRouter: Router = Router();

// projectRouter.get("/", errorHandler(projectsGet));

projectRouter.get("/", errorHandler(projectsSearch));
projectRouter.get("/tags", errorHandler(tagsList));
projectRouter.get("/tags/:id", errorHandler(tagProjectList));

projectRouter.post("/",[authMiddleware], errorHandler(projectsPost));
projectRouter.patch("/:id", [authMiddleware], errorHandler(projectsPatch));
projectRouter.delete("/:id", [authMiddleware], errorHandler(projectsDelete));

export default projectRouter;
