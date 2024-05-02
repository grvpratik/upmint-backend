import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { errorHandler } from "../error";
import { imageUpload } from "../controllers/upload";


export const uploadRouter: Router = Router();

uploadRouter.post('/image',[authMiddleware],errorHandler(imageUpload))