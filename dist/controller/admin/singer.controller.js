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
exports.createPost = exports.create = exports.editPatch = exports.edit = exports.detail = exports.index = void 0;
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const config_1 = require("../../config/config");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singers = yield singer_model_1.default.find({
        deleted: false,
    });
    res.render("admin/page/singer/index", {
        pageTitle: "Quản lý ca sĩ",
        singers: singers,
    });
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const singer = yield singer_model_1.default.findOne({
        _id: id,
        deleted: false,
    });
    res.render("admin/page/singer/detail", {
        pageTitle: "Chi tiết ca sĩ",
        singer: singer,
    });
});
exports.detail = detail;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const singer = yield singer_model_1.default.findOne({
        _id: id,
        deleted: false,
    });
    res.render("admin/page/singer/edit", {
        pageTitle: "Chỉnh sửa ca sĩ",
        singer: singer,
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield singer_model_1.default.updateOne({
        _id: id,
    }, req.body);
    res.redirect("back");
});
exports.editPatch = editPatch;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/page/singer/create", {
        pageTitle: "Thêm mới ca sĩ",
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = new singer_model_1.default(req.body);
    yield data.save();
    res.redirect(`${config_1.systemConfig.prefixAdmin}/singers`);
});
exports.createPost = createPost;
