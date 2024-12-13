import { Router } from "express";

import * as controller from "../../controller/client/song.controller";
const router: Router = Router();

router.get("/:slugTopic", controller.list);
router.get("/detail/:slugTopic", controller.detail);
export const songRouter: Router = router;
