import { Router } from "express";

import { Login } from "../controllers/admin-auth";

const authRouter: Router = Router();

authRouter.post('/admin/login', Login);

export default authRouter;