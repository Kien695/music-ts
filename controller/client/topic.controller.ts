import { Request, Response } from "express";
import Topic from "../../models/topic.model";
//[get]/topic
export const topic = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false,
  }).limit(3);

  res.render("client/page/topic/index", {
    pageTitle: "Chủ đề bài hát",
    topics: topics,
  });
};
//hiện tất cả chủ đề
export const topicAll = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false,
    status: "active",
  });
  res.render("client/page/topic/index", {
    pageTitle: "Trang chủ đề",
    topics: topics,
  });
};
