import { Router } from "express";

import * as controller from "../../controller/client/song.controller";
const router: Router = Router();

router.get("/:slugTopic", controller.list);
router.get("/detail/:slugTopic", controller.detail);
router.patch("/like/:typeLike/:idSong", controller.like);
export const songRouter: Router = router;
