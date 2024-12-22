import { Request, Response } from "express";
import md5 from "md5";
import Account from "../../models/account.model";
import { systemConfig } from "../../config/config";
//[get]/admin/auth/login
export const login = async (req: Request, res: Response) => {
  if (req.cookies.token) {
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
  } else {
    res.render("admin/page/auth/login", {
      pageTitle: "Trang đăng nhập",
    });
  }
};
//[post]/admin/auth/loginPost
export const loginPost = async (req: Request, res: Response) => {
  const email = req.body.email;
  const user = await Account.findOne({
    email: email,
    deleted: false,
  });
  if (!user) {
    req.flash("error", "Email không tồn tại");
    res.redirect("back");
    return;
  }
  if (md5(req.body.password) !== user.password) {
    req.flash("error", "Mật khẩu không chính xác");
    res.redirect("back");
    return;
  }
  if (req.body.status === "inactive") {
    req.flash("error", "Tài khoản đã bị khóa");
    res.redirect("back");
    return;
  }
  res.cookie("token", user.token);

  res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
};
//[get]/admin/auth/logout
export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
};
