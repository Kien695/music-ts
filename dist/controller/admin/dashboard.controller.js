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
exports.dashboard = void 0;
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const dashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const statistic = {
        singer: { total: 0, active: 0, inactive: 0 },
        song: { total: 0, active: 0, inactive: 0 },
        topic: { total: 0, active: 0, inactive: 0 },
    };
    statistic.singer.total = yield singer_model_1.default.countDocuments({
        deleted: false,
    });
    statistic.singer.active = yield singer_model_1.default.countDocuments({
        deleted: false,
        status: "active",
    });
    statistic.singer.inactive = yield singer_model_1.default.countDocuments({
        deleted: false,
        status: "inactive",
    });
    statistic.song.total = yield song_model_1.default.countDocuments({
        deleted: false,
    });
    statistic.song.active = yield song_model_1.default.countDocuments({
        deleted: false,
        status: "active",
    });
    statistic.song.inactive = yield song_model_1.default.countDocuments({
        deleted: false,
        status: "inactive",
    });
    statistic.topic.total = yield topic_model_1.default.countDocuments({
        deleted: false,
    });
    statistic.topic.active = yield topic_model_1.default.countDocuments({
        deleted: false,
        status: "active",
    });
    statistic.topic.inactive = yield topic_model_1.default.countDocuments({
        deleted: false,
        status: "inactive",
    });
    res.render("admin/page/dashboard/index", {
        pageTitle: "Trang chủ",
        statistic: statistic,
    });
});
exports.dashboard = dashboard;
