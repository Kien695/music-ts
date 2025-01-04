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
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const dashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songLikes = yield song_model_1.default.find({
        deleted: false,
    })
        .sort({ like: -1 })
        .limit(3);
    for (const song of songLikes) {
        const infoSinger = yield singer_model_1.default.findOne({
            _id: song.singerId,
            deleted: false,
        });
        song["infoSinger"] = infoSinger;
    }
    const songListens = yield song_model_1.default.find({
        deleted: false,
    })
        .sort({ listen: -1 })
        .limit(3);
    for (const song of songListens) {
        const infoSinger = yield singer_model_1.default.findOne({
            _id: song.singerId,
            deleted: false,
        });
        song["infoSinger"] = infoSinger;
    }
    res.render("client/page/dashboard/index", {
        pageTitle: "Trang chủ",
        songLikes: songLikes,
        songListens: songListens,
    });
});
exports.dashboard = dashboard;
