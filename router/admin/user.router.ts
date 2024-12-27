import { Router } from "express";

import * as controller from "../../controller/admin/user.controller";
const router: Router = Router();
router.get("/", controller.user);
router.patch("/delete/:id", controller.deleted);
export const userRouter: Router = router;
