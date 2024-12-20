import { Router } from "express";
import multer from "multer";
import * as controller from "../../controller/admin/singer.controller";
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
router.get("/detail/:id", controller.detail);
router.get("/edit/:id", controller.edit);
router.patch(
  "/edit/:id",
  upload.single("avatar"),
  uploadCloud.uploadSingle,
  controller.editPatch
);
export const singerRouter: Router = router;
