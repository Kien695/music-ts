import { Request, Response } from "express";
import Topic from "../../models/topic.model";
//[get]/topic
export const topic = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false,
  });

  res.render("client/page/topic/index", {
    pageTitle: "Chủ đề bài hát",
    topics: topics,
  });
};
