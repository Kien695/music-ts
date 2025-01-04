"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPost = exports.otpPost = exports.forgotPost = exports.loginPost = exports.registerPost = void 0;
const registerPost = (req, res, next) => {
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
exports.registerPost = registerPost;
const loginPost = (req, res, next) => {
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
exports.loginPost = loginPost;
const forgotPost = (req, res, next) => {
    if (!req.body.email) {
        req.flash("error", "Vui lòng nhập email");
        res.redirect("back");
        return;
    }
    next();
};
exports.forgotPost = forgotPost;
const otpPost = (req, res, next) => {
    if (!req.body.otp) {
        req.flash("error", "Vui lòng nhập mã OTP");
        res.redirect("back");
        return;
    }
    next();
};
exports.otpPost = otpPost;
const resetPost = (req, res, next) => {
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
exports.resetPost = resetPost;
