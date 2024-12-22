import { Router } from "express";

import * as controller from "../../controller/admin/auth.controller";
import * as validate from "../../validates/admin/auth.validate";
const router: Router = Router();
router.get("/login", controller.login);
router.post("/login", validate.loginPost, controller.loginPost);
router.get("/logout", controller.logout);
export const authRouter: Router = router;
