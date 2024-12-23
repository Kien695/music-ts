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
exports.permissionPatch = exports.permission = exports.deleted = exports.editPatch = exports.edit = exports.detail = exports.createPost = exports.create = exports.index = void 0;
const role_model_1 = __importDefault(require("../../models/role.model"));
const config_1 = require("../../config/config");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield role_model_1.default.find({
        deleted: false,
    });
    res.render("admin/page/role/index", {
        pageTitle: "Nhóm quyền",
        roles: roles,
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/page/role/create", {
        pageTitle: "Tạo nhóm quyền",
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const role = new role_model_1.default(req.body);
    yield role.save();
    res.redirect(`${config_1.systemConfig.prefixAdmin}/roles`);
});
exports.createPost = createPost;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const role = yield role_model_1.default.findOne({
        deleted: false,
    });
    res.render("admin/page/role/detail", {
        pageTitle: "Chi tiết nhóm quyền",
        role: role,
    });
});
exports.detail = detail;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const role = yield role_model_1.default.findOne({
        _id: req.params.id,
        deleted: false,
    });
    res.render("admin/page/role/edit", {
        pageTitle: "Chỉnh sửa nhóm quyền",
        role: role,
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield role_model_1.default.updateOne({
        _id: req.params.id,
    }, req.body);
    res.redirect("back");
});
exports.editPatch = editPatch;
const deleted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield role_model_1.default.updateOne({
        _id: req.params.id,
    }, {
        deleted: true,
    });
    res.redirect("back");
});
exports.deleted = deleted;
const permission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const records = yield role_model_1.default.find({
        deleted: false,
    });
    res.render("admin/page/role/permission", {
        pageTitle: "Phân quyền",
        records: records,
    });
});
exports.permission = permission;
const permissionPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const permissions = JSON.parse(req.body.permission);
    for (const item of permissions) {
        yield role_model_1.default.updateOne({ _id: item.id }, { permission: item.permissions });
    }
    req.flash("success", "Cập nhật phân quyền thành công!");
    res.redirect("back");
});
exports.permissionPatch = permissionPatch;
