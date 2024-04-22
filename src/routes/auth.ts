import { Router } from "express";

import { Login } from "../controllers/admin-auth";
import { errorHandler } from "../error";

const authRouter: Router = Router();

authRouter.post('/admin/login',errorHandler(Login) );

export default authRouter;