import { Router } from "express";

import { userLogin, adminLogin } from "../controllers/auth";
import { errorHandler } from "../error";

const authRouter: Router = Router();
//for admin  authentication
authRouter.post("/admin/login", errorHandler(adminLogin));


authRouter.post("/user/login", errorHandler(userLogin));

export default authRouter;