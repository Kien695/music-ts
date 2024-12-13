import mongoose from "mongoose";
const favoriteSongSchema = new mongoose.Schema(
  {
    userId: String,
    songId: String,
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
const Favorite = mongoose.model("Favorite", favoriteSongSchema, "favorite");
export default Favorite;
