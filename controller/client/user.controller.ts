import { Request, Response } from "express";
import { generateRandomNumber } from "../../helpers/generate";
import Forgot from "../../models/forgot-password.model";
import { sendMail } from "../../helpers/sendMail";
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
//[get]/user/password/forgot
export const forgot = (req: Request, res: Response) => {
  res.render("client/page/user/forgot", {
    pageTitle: "Lấy lại mật khẩu",
  });
};
//[post]/user/password/forgot
export const forgotPost = async (req: Request, res: Response) => {
  const email = req.body.email;
  const user = await User.findOne({
    email: email,
    deleted: false,
  });
  if (!user) {
    req.flash("error", "Email không tồn tại");
    res.redirect("back");
    return;
  }
  //lưu thông tin vào db
  const otp = generateRandomNumber(8);
  const objectForgot = {
    email: req.body.email,
    otp: otp,
    expireAt: Date.now(),
  };
  const forgot = new Forgot(objectForgot);
  await forgot.save();
  //nếu tồn tại email thì gởi otp qua email
  const subject = "Mã OTP xác minh";
  const html = `Mã otp xác minh là :<b style="color: green;">${otp}</b>. Thời hạn sử dụng là 3 phút.`;
  sendMail(email, subject, html);
  res.redirect(`/user/password/otp?email=${email}`);
};
//[get]/user/password/otp
export const otp = (req: Request, res: Response) => {
  const email = req.query.email;
  res.render("client/page/user/otp", {
    pageTitle: "Nhập mã OTP",
    email: email,
  });
};
//[post]/user/password/otpPost
export const otpPost = async (req: Request, res: Response) => {
  const result = await Forgot.findOne({
    email: req.body.email,
    otp: req.body.otp,
  });
  if (!result) {
    req.flash("error", "Mã otp không hợp lệ");
    res.redirect("back");
    return;
  }
  const user = await User.findOne({
    email: req.body.email,
  });
  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/user/password/reset");
};
//[get]/user/password/reset
export const reset = (req: Request, res: Response) => {
  res.render("client/page/user/reset", {
    pageTitle: "Nhập mã OTP",
  });
};
//[post]/user/password/resetPost
export const resetPost = async (req: Request, res: Response) => {
  const tokenUser = req.cookies.tokenUser;
  await User.updateOne(
    {
      tokenUser: tokenUser,
    },
    {
      password: md5(req.body.password),
    }
  );
  req.flash("success", "Đổi mật khẩu thành công");
  res.redirect("/");
};
