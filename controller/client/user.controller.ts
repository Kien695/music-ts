import { Request, Response } from "express";
import md5 from "md5";
import User from "../../models/user.model";
//[get]/user/register
export const register = (req: Request, res: Response) => {
  res.render("client/page/user/register", {
    pageTitle: "Trang đăng kí",
  });
};
//[post]/user/registerPost
export const registerPost = async (req: Request, res: Response) => {
  const exitEmail = await User.findOne({
    email: req.body.email,
    deleted: false,
    status: "active",
  });
  if (exitEmail) {
    req.flash("error", "Email này đã tồn tại");
    res.redirect("back");
    return;
  }
  req.body.password = md5(req.body.password);
  const user = new User(req.body);
  await user.save();
  // res.cookie("tokenUser", user.tokenUser);
  res.redirect("/");
};
//[get]/user/login
export const login = (req: Request, res: Response) => {
  res.render("client/page/user/login", {
    pageTitle: "Trang đăng nhập",
  });
};
//[post]/user/loginPost
export const loginPost = async (req: Request, res: Response) => {
  const user = await User.findOne({
    email: req.body.email,
    deleted: false,
  });
  if (!user) {
    req.flash("error", "Email không tồn tại");
    res.redirect("back");
    return;
  }
  if (md5(req.body.password) !== user.password) {
    req.flash("success", "Mật khẩu không chính xác");
    res.redirect("back");
    return;
  }
  if (user.status === "inactive") {
    req.flash("error", "Tài khoản này đã dừng hoạt động");
    res.redirect("back");
    return;
  }
  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/");
};
//[get]/user/logout
export const logout = (req: Request, res: Response) => {
  res.clearCookie("tokenUser");
  res.redirect("/");
};
