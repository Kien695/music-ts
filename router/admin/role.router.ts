import { Router } from "express";

import * as controller from "../../controller/admin/role.controller";
const router: Router = Router();
router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/create", controller.createPost);
router.get("/detail/:id", controller.detail);
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id", controller.editPatch);
router.patch("/delete/:id", controller.deleted);

export const roleRouter: Router = router;
