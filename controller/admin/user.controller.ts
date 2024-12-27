import { Request, Response } from "express";
import User from "../../models/user.model";
//[get]/admin/dashboard
export const user = async (req: Request, res: Response) => {
  const users = await User.find({
    deleted: false,
    status: "active",
  }).select("-password");
  res.render("admin/page/user/index", {
    pageTitle: "Danh sách tài khoản user",
    users: users,
  });
};
//[get]/admin/user/delete
export const deleted = async (req: Request, res: Response) => {
  await User.updateOne(
    {
      _id: req.params.id,
    },
    {
      deleted: true,
    }
  );
  req.flash("success", "Xóa thành công");
  res.redirect("back");
};
