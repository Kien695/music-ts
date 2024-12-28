import { Request, Response } from "express";
import Topic from "../../models/topic.model";
export const dashboard = async (req: Request, res: Response) => {
  res.render("client/page/dashboard/index", {
    pageTitle: "Trang chủ",
  });
};
