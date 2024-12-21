import { Router } from "express";

import * as controller from "../../controller/admin/user.controller";
const router: Router = Router();
router.get("/", controller.user);

export const userRouter: Router = router;
