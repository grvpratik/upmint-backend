import { Router } from "express";
import { errorHandler } from "../error";
import { tagsList, projectsDelete,  projectsPatch, projectsPost, projectsSearch, projectsByTag, projectsDetails, } from "../controllers/project";
import { authMiddleware } from "../middleware/auth";

const projectRouter: Router = Router();

// projectRouter.get("/", errorHandler(projectsGet));

projectRouter.get("/", errorHandler(projectsSearch));
projectRouter.get("/tags", errorHandler(tagsList));
projectRouter.get("/tags/:name", errorHandler(projectsByTag));
projectRouter.get("/:slug", errorHandler(projectsDetails));

projectRouter.post("/", [authMiddleware], errorHandler(projectsPost));
projectRouter.patch("/:slug", [authMiddleware], errorHandler(projectsPatch));
projectRouter.delete("/:slug", [authMiddleware], errorHandler(projectsDelete));

export default projectRouter;
