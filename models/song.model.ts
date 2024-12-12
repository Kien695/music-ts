import mongoose from "mongoose";
const songSchema = new mongoose.Schema(
  {
    title: String,
    avatar: String,
    description: String,
    singerId: String,
    topicId: String,
    like: Number,
    lyrics: String,
    audio: String,
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
const Song = mongoose.model("Song", songSchema, "song");
export default Song;
