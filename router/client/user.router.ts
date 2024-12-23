import { Router } from "express";

import * as controller from "../../controller/client/user.controller";
import * as validate from "../../validates/client/user.validate";
const router: Router = Router();
router.get("/register", controller.register);
router.post("/register", validate.registerPost, controller.registerPost);
router.get("/login", controller.login);
router.post("/login", validate.loginPost, controller.loginPost);
router.get("/logout", controller.logout);
router.get("/password/forgot", controller.forgot);
router.post("/password/forgot", validate.forgotPost, controller.forgotPost);
router.get("/password/otp", controller.otp);
router.post("/password/otp", validate.otpPost, controller.otpPost);
router.get("/password/reset", controller.reset);
router.post("/password/reset", validate.resetPost, controller.resetPost);
export const userRouter: Router = router;
