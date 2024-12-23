import { Router } from "express";

import * as controller from "../../controller/client/user.controller";
import * as validate from "../../validates/client/user.validate";
const router: Router = Router();
router.get("/register", controller.register);
router.post("/register", validate.registerPost, controller.registerPost);
router.get("/login", controller.login);
router.post("/login", validate.loginPost, controller.loginPost);
router.get("/logout", controller.logout);
export const userRouter: Router = router;
