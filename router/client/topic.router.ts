import express, { Router, Request, Response } from "express";
import Topic from "../../models/topic.model";
const router: Router = Router();
router.get("/", async (req: Request, res: Response) => {
  const topics = await Topic.find({
    delete: false,
  });
  console.log(topics);
  res.render("client/page/topic/index");
});
export const topicRouter: Router = router;
