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
exports.result = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const convertslyg_1 = require("../../helpers/convertslyg");
const result = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.params.type;
    const keyword = `${req.query.keyword}`;
    let newSong = [];
    if (newSong) {
        const keywordRegex = yield new RegExp(keyword, "i");
        const stringSlug = (0, convertslyg_1.convertToSlug)(keyword);
        const stringSlugRegex = yield new RegExp(stringSlug, "i");
        const song = yield song_model_1.default.find({
            $or: [{ title: keywordRegex }, { slug: stringSlugRegex }],
        });
        for (const item of song) {
            const infoSinger = yield singer_model_1.default.findOne({
                _id: item.singerId,
            });
            newSong.push({
                id: item.id,
                title: item.title,
                avatar: item.avatar,
                like: item.like,
                slug: item.slug,
                infoSinger: {
                    fullName: infoSinger.fullName,
                },
            });
        }
    }
    switch (type) {
        case "result":
            res.render("client/page/search/result", {
                pageTitle: `Kết quả: ${keyword}`,
                keyword: keyword,
                songs: newSong,
            });
            break;
        case "suggest":
            res.json({
                code: 200,
                message: "Thành công",
                songs: newSong,
            });
            break;
        default:
            break;
    }
});
exports.result = result;
