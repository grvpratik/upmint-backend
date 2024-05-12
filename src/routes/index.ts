import { Router } from "express";
import authRouter from "./auth";
import projectRouter from "./project";

import { uploadRouter } from "./uplaod";
import articleRouter from "./article";




const rootRouter: Router = Router();


//For admin user & normal user
rootRouter.use('/auth', authRouter);

//For general user
rootRouter.use('/projects', projectRouter)

//For blog posts

rootRouter.use("/articles", articleRouter);


//for image upload
rootRouter.use("/uploads", uploadRouter);


export default rootRouter;