import { Request, Response, NextFunction } from "express";
import Account from "../../models/account.model";
import { systemConfig } from "../../config/config";
import Role from "../../models/role.model";
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.cookies.token) {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  } else {
    const user = await Account.findOne({
      token: req.cookies.token,
    }).select("-password");
    if (!user) {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
      const role = await Role.findOne({
        _id: user.role_id,
      }).select("title permission");
      res.locals.role = role;
      res.locals.user = user;
      next();
    }
  }
};
