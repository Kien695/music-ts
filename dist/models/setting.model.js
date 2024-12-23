"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const settingSchema = new mongoose_1.default.Schema({
    websiteName: String,
    logo: String,
    email: String,
    phone: String,
    address: String,
    copyRight: String,
}, {
    timestamps: true,
});
const Setting = mongoose_1.default.model("Getting", settingSchema, "setting-general");
exports.default = Setting;
