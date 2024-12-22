import { Request, Response, NextFunction } from "express";
import Account from "../../models/account.model";
import { systemConfig } from "../../config/config";
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
    });
    if (!user) {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
      res.locals.user = user;
      next();
    }
  }
};
