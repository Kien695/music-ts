import { Request, Response, NextFunction } from "express";

import { systemConfig } from "../../config/config";
import Role from "../../models/role.model";
import User from "../../models/user.model";
export const userMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.cookies.tokenUser) {
    const user = await User.findOne({
      tokenUser: req.cookies.tokenUser,
      deleted: false,
      status: "active",
    }).select("-password");
    if (user) {
      res.locals.user = user;
    }
  }
  next();
};
