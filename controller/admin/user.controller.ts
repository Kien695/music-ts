import { Request, Response } from "express";
//[get]/admin/dashboard
export const user = (req: Request, res: Response) => {
  res.render("admin/page/user/index", {
    pageTitle: "Danh sách tài khoản user",
  });
};
