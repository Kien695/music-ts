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
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const config_1 = require("../../config/config");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.default.find({
        deleted: false,
    });
    res.render("admin/page/topic/index", {
        pageTitle: "Quản lý chủ đề",
        topics: topics,
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/page/topic/create", {
        pageTitle: "Trang tạo mới",
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dataSong = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        avatar: req.body.avatar,
    };
    const topic = new topic_model_1.default(dataSong);
    yield topic.save();
    res.redirect(`${config_1.systemConfig.prefixAdmin}/topics`);
});
exports.createPost = createPost;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const topic = yield topic_model_1.default.findOne({
        _id: id,
    });
    res.render("admin/page/topic/detail", {
        pageTitle: "Trang chi tiết",
        topic: topic,
    });
});
exports.detail = detail;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const topic = yield topic_model_1.default.findOne({
        _id: id,
    });
    res.render("admin/page/topic/edit", {
        pageTitle: "Trang chỉnh sửa",
        topic: topic,
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const topic = yield topic_model_1.default.updateOne({
        _id: id,
    }, req.body);
    res.redirect("back");
});
exports.editPatch = editPatch;
const deleted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield topic_model_1.default.updateOne({
        _id: id,
    }, {
        deleted: true,
    });
    res.redirect("back");
});
exports.deleted = deleted;
