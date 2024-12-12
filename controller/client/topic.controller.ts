import { Request, Response } from "express";
import Topic from "../../models/topic.model";
//[get]/topic
export const topic = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    delete: false,
  });
  console.log(topics);
  res.render("client/page/topic/index");
};
