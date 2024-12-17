import { Router } from "express";
import multer from "multer";
import * as controller from "../../controller/admin/song.controller";
import * as uploadCloud from "../../middleware/admin/uploadCloud.middleware";
const upload = multer();
const router: Router = Router();
router.get("/", controller.song);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("avatar"),
  uploadCloud.uploadSingle,
  controller.createPost
);

export const songRouter: Router = router;
