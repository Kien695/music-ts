import { Router } from "express";
import Topic from "../../models/topic.model";
import * as controller from "../../controller/client/dashboard.controller";
const router: Router = Router();
router.get("/", controller.dashboard);

export const dashboardRouter: Router = router;
