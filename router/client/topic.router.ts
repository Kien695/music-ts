import { Router } from "express";
import Topic from "../../models/topic.model";
import * as controller from "../../controller/client/topic.controller";
const router: Router = Router();

router.get("/topic", controller.topic);
export const topicRouter: Router = router;
