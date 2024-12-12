import { Request, Response } from "express";
export const dashboard = (req: Request, res: Response) => {
  res.render("client/page/dashboard/index", {
    pageTitle: "Trang chủ",
  });
};
