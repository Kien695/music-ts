import { Request, Response } from "express";
import Topic from "../../models/topic.model";
//[get]/admin/topics
export const index = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false,
  });
  res.render("admin/page/topic/index", {
    pageTitle: "Quản lý chủ đề",
    topics: topics,
  });
};
