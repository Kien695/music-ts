import { Router } from "express";
import multer from "multer";
import * as controller from "../../controller/client/user.controller";
import * as validate from "../../validates/client/user.validate";
import * as uploadCloud from "../../middleware/admin/uploadCloud.middleware";
const upload = multer();
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
router.get("/info", controller.info);
router.get("/edit/:id", controller.edit);
router.patch(
  "/edit/:id",
  upload.single("avatar"),
  uploadCloud.uploadSingle,
  controller.editPatch
);
export const userRouter: Router = router;
