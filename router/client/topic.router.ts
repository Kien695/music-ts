import { Router } from "express";
import Topic from "../../models/topic.model";
import * as controller from "../../controller/client/topic.controller";
const router: Router = Router();

router.get("/", controller.topic);
// router.get("/all", controller.topicAll);
export const topicRouter: Router = router;
