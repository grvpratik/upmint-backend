import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { errorHandler } from "../error";
import {
	articleDelete,
	articleDetails,
	articleGet,
	articlePost,
	articleUpdate,
} from "../controllers/article";

const articleRouter: Router = Router();

articleRouter.post("/", [authMiddleware], errorHandler(articlePost));
articleRouter.patch("/:slug", [authMiddleware], errorHandler(articleUpdate));
articleRouter.delete("/:slug", [authMiddleware], errorHandler(articleDelete));

articleRouter.get("/", errorHandler(articleGet));
articleRouter.get("/:slug", errorHandler(articleDetails));

export default articleRouter;

