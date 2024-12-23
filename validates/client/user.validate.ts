import { Request, Response, NextFunction } from "express";
export const registerPost = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập email");
    res.redirect("back");
    return;
  }
  if (!req.body.fullName) {
    req.flash("error", "Vui lòng nhập họ tên");
    res.redirect("back");
    return;
  }
  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập mật khẩu");
    res.redirect("back");
    return;
  }
  next();
};
export const loginPost = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập email");
    res.redirect("back");
    return;
  }
  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập mật khẩu");
    res.redirect("back");
    return;
  }
  next();
};
export const forgotPost = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập email");
    res.redirect("back");
    return;
  }
  next();
};
export const otpPost = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.otp) {
    req.flash("error", "Vui lòng nhập mã OTP");
    res.redirect("back");
    return;
  }
  next();
};
export const resetPost = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập mật khẩu mới");
    res.redirect("back");
    return;
  }
  if (!req.body.confirmPassword) {
    req.flash("error", "Vui lòng nhập xác nhận mật khẩu");
    res.redirect("back");
    return;
  }
  if (req.body.confirmPassword !== req.body.password) {
    req.flash("error", "Mật khẩu không khớp");
    res.redirect("back");
    return;
  }
  next();
};
