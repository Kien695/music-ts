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
exports.deleted = exports.detail = exports.editPatch = exports.edit = exports.createPost = exports.create = exports.song = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const config_1 = require("../../config/config");
const song = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield song_model_1.default.find({
        deleted: false,
    });
    res.render("admin/page/song/index", {
        pageTitle: "Quản lý bài hát",
        songs: songs,
    });
});
exports.song = song;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.default.find({
        status: "active",
        deleted: false,
    }).select("title");
    const singers = yield singer_model_1.default.find({
        status: "active",
        deleted: false,
    }).select("fullName");
    res.render("admin/page/song/create", {
        pageTitle: "Thêm mới bài hát",
        topics: topics,
        singers: singers,
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let avatar = "";
    let audio = "";
    if (req.body.avatar) {
        avatar = req.body.avatar[0];
    }
    if (req.body.audio) {
        audio = req.body.audio[0];
    }
    const dataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        avatar: avatar,
        audio: audio,
        lyrics: req.body.lyrics,
    };
    const song = new song_model_1.default(dataSong);
    yield song.save();
    res.redirect(`${config_1.systemConfig.prefixAdmin}/songs`);
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const song = yield song_model_1.default.findOne({
        _id: id,
        deleted: false,
    });
    const topics = yield topic_model_1.default.find({
        deleted: false,
    }).select("title");
    const singers = yield singer_model_1.default.find({
        deleted: false,
    }).select("fullName");
    res.render("admin/page/song/edit", {
        pageTitle: "Trang chỉnh sửa",
        song: song,
        topics: topics,
        singers: singers,
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const dataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        lyrics: req.body.lyrics,
    };
    if (req.body.avatar) {
        dataSong["avatar"] = req.body.avatar[0];
    }
    if (req.body.audio) {
        dataSong["audio"] = req.body.audio[0];
    }
    yield song_model_1.default.updateOne({ _id: id }, dataSong);
    res.redirect("back");
});
exports.editPatch = editPatch;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const song = yield song_model_1.default.findOne({
        _id: id,
        deleted: false,
    });
    const topic = yield topic_model_1.default.findOne({
        _id: song.topicId,
        deleted: false,
    });
    const singer = yield singer_model_1.default.findOne({
        _id: song.singerId,
        deleted: false,
    }).select("fullName");
    res.render("admin/page/song/detail", {
        pageTitle: "Trang chi tiết",
        song: song,
        singer: singer,
        topic: topic,
    });
});
exports.detail = detail;
const deleted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield song_model_1.default.updateOne({
        _id: id,
    }, {
        deleted: true,
    });
    res.redirect("back");
});
exports.deleted = deleted;
