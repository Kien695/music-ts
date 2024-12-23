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
exports.forgotPost = exports.forgot = exports.logout = exports.loginPost = exports.login = exports.registerPost = exports.register = void 0;
const generate_1 = require("../../helpers/generate");
const forgot_password_model_1 = __importDefault(require("../../models/forgot-password.model"));
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
    const user = yield user_model_1.default.findOne({
        email: req.body.email,
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
    res.send("ok");
});
exports.forgotPost = forgotPost;
