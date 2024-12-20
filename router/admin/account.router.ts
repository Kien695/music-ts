import { Router } from "express";
import multer from "multer";
import * as controller from "../../controller/admin/account.controller";
import * as uploadCloud from "../../middleware/admin/uploadCloud.middleware";
const upload = multer();
const router: Router = Router();
router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("avatar"),
  uploadCloud.uploadSingle,
  controller.createPost
);

export const accountRouter: Router = router;
