"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const topicSchema = new mongoose_1.default.Schema({
    title: String,
    avatar: String,
    description: String,
    status: String,
    slug: String,
    deleted: {
        default: "false",
        type: Boolean,
    },
    deletedAt: Date,
}, {
    timestamps: true,
});
const Topic = mongoose_1.default.model("Topic", topicSchema, "topic");
exports.default = Topic;
