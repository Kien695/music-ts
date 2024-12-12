import { timeStamp } from "console";
import mongoose from "mongoose";
const topicSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);
const Topic = mongoose.model("Topic", topicSchema, "topic");
export default Topic;
