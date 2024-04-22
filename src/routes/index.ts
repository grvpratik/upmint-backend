import { Router } from "express";
import authRouter from "./admin-auth";



const rootRouter: Router = Router();



rootRouter.use('auth', authRouter);

export default rootRouter;