import { Request, Response, NextFunction } from "express";
import Setting from "../../models/setting.model";
export const settingGeneral = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const settingGeneral = await Setting.findOne({});
  res.locals.settingGeneral = settingGeneral;
  next();
};
