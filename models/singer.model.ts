import mongoose from "mongoose";
const singerSchema = new mongoose.Schema(
  {
    fullName: String,
    avatar: String,
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
const Singer = mongoose.model("Singer", singerSchema, "singer");
export default Singer;
