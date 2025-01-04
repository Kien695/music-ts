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
exports.deleted = exports.user = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find({
        deleted: false,
        status: "active",
    }).select("-password");
    res.render("admin/page/user/index", {
        pageTitle: "Danh sách tài khoản user",
        users: users,
    });
});
exports.user = user;
const deleted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.updateOne({
        _id: req.params.id,
    }, {
        deleted: true,
    });
    req.flash("success", "Xóa thành công");
    res.redirect("back");
});
exports.deleted = deleted;
