"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPatch = exports.edit = exports.info = exports.resetPost = exports.reset = exports.otpPost = exports.otp = exports.forgotPost = exports.forgot = exports.logout = exports.loginPost = exports.login = exports.registerPost = exports.register = void 0;
const generate_1 = require("../../helpers/generate");
const forgot_password_model_1 = __importDefault(require("../../models/forgot-password.model"));
const sendMail_1 = require("../../helpers/sendMail");
const md5_1 = __importDefault(require("md5"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const register = (req, res) => {
    res.render("client/page/user/register", {
        pageTitle: "Trang đăng kí",
    });
};
exports.register = register;
const registerPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const exitEmail = yield user_model_1.default.findOne({
        email: req.body.email,
        deleted: false,
        status: "active",
    });
    if (exitEmail) {
        req.flash("error", "Email này đã tồn tại");
        res.redirect("back");
        return;
    }
    req.body.password = (0, md5_1.default)(req.body.password);
    const user = new user_model_1.default(req.body);
    yield user.save();
    res.redirect("/");
});
exports.registerPost = registerPost;
const login = (req, res) => {
    res.render("client/page/user/login", {
        pageTitle: "Trang đăng nhập",
    });
};
exports.login = login;
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({
        email: req.body.email,
        deleted: false,
    });
    if (!user) {
        req.flash("error", "Email không tồn tại");
        res.redirect("back");
        return;
    }
    if ((0, md5_1.default)(req.body.password) !== user.password) {
        req.flash("error", "Mật khẩu không chính xác");
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
});
exports.loginPost = loginPost;
const logout = (req, res) => {
    res.clearCookie("tokenUser");
    res.redirect("/");
};
exports.logout = logout;
const forgot = (req, res) => {
    res.render("client/page/user/forgot", {
        pageTitle: "Lấy lại mật khẩu",
    });
};
exports.forgot = forgot;
const forgotPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const user = yield user_model_1.default.findOne({
        email: email,
        deleted: false,
    });
    if (!user) {
        req.flash("error", "Email không tồn tại");
        res.redirect("back");
        return;
    }
    const otp = (0, generate_1.generateRandomNumber)(8);
    const objectForgot = {
        email: req.body.email,
        otp: otp,
        expireAt: Date.now(),
    };
    const forgot = new forgot_password_model_1.default(objectForgot);
    yield forgot.save();
    const subject = "Mã OTP xác minh";
    const html = `Mã otp xác minh là :<b style="color: green;">${otp}</b>. Thời hạn sử dụng là 3 phút.`;
    (0, sendMail_1.sendMail)(email, subject, html);
    res.redirect(`/user/password/otp?email=${email}`);
});
exports.forgotPost = forgotPost;
const otp = (req, res) => {
    const email = req.query.email;
    res.render("client/page/user/otp", {
        pageTitle: "Nhập mã OTP",
        email: email,
    });
};
exports.otp = otp;
const otpPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield forgot_password_model_1.default.findOne({
        email: req.body.email,
        otp: req.body.otp,
    });
    if (!result) {
        req.flash("error", "Mã otp không hợp lệ");
        res.redirect("back");
        return;
    }
    const user = yield user_model_1.default.findOne({
        email: req.body.email,
    });
    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/user/password/reset");
});
exports.otpPost = otpPost;
const reset = (req, res) => {
    res.render("client/page/user/reset", {
        pageTitle: "Nhập mã OTP",
    });
};
exports.reset = reset;
const resetPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUser = req.cookies.tokenUser;
    yield user_model_1.default.updateOne({
        tokenUser: tokenUser,
    }, {
        password: (0, md5_1.default)(req.body.password),
    });
    req.flash("success", "Đổi mật khẩu thành công");
    res.redirect("/");
});
exports.resetPost = resetPost;
const info = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({
        tokenUser: res.locals.user.tokenUser,
    }).select("-password");
    res.render("client/page/user/info", {
        pageTitle: "Trang thông tin cá nhân",
        user: user,
    });
});
exports.info = info;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield user_model_1.default.findOne({
        _id: id,
        deleted: false,
        status: "active",
    }).select("-password");
    res.render("client/page/user/edit", {
        pageTitle: "Chỉnh sửa thông tin cá nhân",
        user: user,
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield user_model_1.default.updateOne({ _id: id }, req.body);
    res.redirect(`/user/info`);
});
exports.editPatch = editPatch;
