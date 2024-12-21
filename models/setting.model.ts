import mongoose from "mongoose";
const settingSchema = new mongoose.Schema(
  {
    websiteName: String,
    logo: String,
    email: String,
    phone: String,
    address: String,
    copyRight: String,
  },
  {
    timestamps: true,
  }
);
const Setting = mongoose.model("Getting", settingSchema, "setting-general");
export default Setting;
