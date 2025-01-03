import { Request, Response } from "express";
import Topic from "../../models/topic.model";
//[get]/topic
export const topic = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false,
  });

  if (req.query.api === "true") {
    // Trả về JSON nếu yêu cầu là API
    res.json({
      code: 200,
      topics: topics,
    });
  } else {
    // Render trang nếu không phải API
    res.render("client/page/topic/index", {
      pageTitle: "Chủ đề bài hát",
    });
  }
};
