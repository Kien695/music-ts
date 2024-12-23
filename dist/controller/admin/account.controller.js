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
exports.deleted = exports.editPatch = exports.edit = exports.detail = exports.createPost = exports.create = exports.index = void 0;
const md5_1 = __importDefault(require("md5"));
const role_model_1 = __importDefault(require("../../models/role.model"));
const account_model_1 = __importDefault(require("../../models/account.model"));
const config_1 = require("../../config/config");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accounts = yield account_model_1.default.find({
        deleted: false,
    }).select("-password -token");
    for (const item of accounts) {
        const role = yield role_model_1.default.findOne({
            _id: item.role_id,
            deleted: false,
        });
        item["role"] = role;
    }
    res.render("admin/page/account/index", {
        pageTitle: "Trang tài khoản",
        accounts: accounts,
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield role_model_1.default.find({
        deleted: false,
    });
    res.render("admin/page/account/create", {
        pageTitle: "Trang tạo tài khoản",
        roles: roles,
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emailExit = yield account_model_1.default.findOne({
        email: req.body.email,
        deleted: false,
    });
    if (emailExit) {
        req.flash("error", "Email đã tồn tại");
        res.redirect("back");
    }
    else {
        req.body.password = (0, md5_1.default)(req.body.password);
        const data = new account_model_1.default(req.body);
        yield data.save();
        req.flash("success", "Tạo tài khoản thành công");
        res.redirect(`${config_1.systemConfig.prefixAdmin}/accounts`);
    }
});
exports.createPost = createPost;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const account = yield account_model_1.default.findOne({
        _id: id,
        deleted: false,
    }).select("-password -token");
    const role = yield role_model_1.default.findOne({
        _id: account.role_id,
        deleted: false,
    });
    res.render("admin/page/account/detail", {
        pageTitle: "Trang chi tiết",
        role: role,
        account: account,
    });
});
exports.detail = detail;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const account = yield account_model_1.default.findOne({
        _id: id,
        deleted: false,
    }).select("-password");
    const roles = yield role_model_1.default.find({
        deleted: false,
    });
    res.render("admin/page/account/edit", {
        pageTitle: "Trang chỉnh sửa",
        data: account,
        roles: roles,
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const emailExit = yield account_model_1.default.findOne({
        _id: { $ne: id },
        email: req.body.email,
        deleted: false,
    });
    if (emailExit) {
        req.flash("error", "Email đã tồn tại");
        res.redirect("back");
    }
    else {
        if (req.body.password) {
            req.body.password = (0, md5_1.default)(req.body.password);
        }
        else {
            delete req.body.password;
        }
        yield account_model_1.default.updateOne({ _id: id }, req.body);
        req.flash("success", "Chỉnh sửa thành ông");
    }
    res.redirect(`${config_1.systemConfig.prefixAdmin}/accounts`);
});
exports.editPatch = editPatch;
const deleted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield account_model_1.default.updateOne({ _id: req.params.id }, { deleted: true });
    req.flash("success", "Xóa tài khoản thành công");
    res.redirect("back");
});
exports.deleted = deleted;
