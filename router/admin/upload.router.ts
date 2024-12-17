import { Router } from "express";
import multer from "multer";
import * as controller from "../../controller/admin/upload.controller";
import * as uploadCloud from "../../middleware/admin/uploadCloud.middleware";
const upload = multer();
const router: Router = Router();
router.post(
  "/",
  upload.single("file"),
  uploadCloud.uploadSingle,
  controller.index
);

export const uploadRouter: Router = router;
