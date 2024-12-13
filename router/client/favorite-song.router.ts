import { Router } from "express";
import Topic from "../../models/topic.model";
import * as controller from "../../controller/client/favorite-song.controller";
const router: Router = Router();
router.get("/", controller.index);

export const favoriteRouter: Router = router;
