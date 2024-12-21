import { Request, Response } from "express";
import Setting from "../../models/setting.model";
//[get]/admin/dashboard
export const general = async (req: Request, res: Response) => {
  const settingGeneral = await Setting.findOne({});
  res.render("admin/page/setting/general", {
    pageTitle: "Trang cài đặt chung",
    settingGeneral: settingGeneral,
  });
};
//[get]/admin/dashboard
export const generalPatch = async (req: Request, res: Response) => {
  const settingGeneral = await Setting.findOne({});
  if (settingGeneral) {
    await Setting.updateOne({ _id: settingGeneral.id }, req.body);
  } else {
    const data = new Setting(req.body);
    await data.save();
  }
  res.redirect("back");
};
