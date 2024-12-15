import { Request, Response } from "express";
//[get]/admin/dashboard
export const dashboard = (req: Request, res: Response) => {
  res.render("admin/page/dashboard/index", {
    pageTitle: "Trang chủ",
  });
};
