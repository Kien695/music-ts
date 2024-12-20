import { Request, Response } from "express";
import md5 from "md5";
import Role from "../../models/role.model";
import Account from "../../models/account.model";
import { systemConfig } from "../../config/config";
//[get]/admin/accounts
export const index = async (req: Request, res: Response) => {
  const accounts = await Account.find({
    deleted: false,
  }).select("-password -token");
  for (const item of accounts) {
    const role = await Role.findOne({
      _id: item.role_id,
      deleted: false,
    });
    item["role"] = role;
  }
  res.render("admin/page/account/index", {
    pageTitle: "Trang tài khoản",
    accounts: accounts,
  });
};
//[get]/admin/accounts/create
export const create = async (req: Request, res: Response) => {
  const roles = await Role.find({
    deleted: false,
  });
  res.render("admin/page/account/create", {
    pageTitle: "Trang tạo tài khoản",
    roles: roles,
  });
};
//[get]/admin/accounts/createPost
export const createPost = async (req: Request, res: Response) => {
  const emailExit = await Account.findOne({
    email: req.body.email,
    deleted: false,
  });
  if (emailExit) {
    req.flash("error", "Email đã tồn tại");
    res.redirect("back");
  } else {
    req.body.password = md5(req.body.password);
    const data = new Account(req.body);
    await data.save();
    req.flash("success", "Tạo tài khoản thành công");
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};
//[get]/admin/accounts/createPost
export const detail = async (req: Request, res: Response) => {
  const id = req.params.id;
  const account = await Account.findOne({
    _id: id,
    deleted: false,
  }).select("-password -token");
  const role = await Role.findOne({
    _id: account.role_id,
    deleted: false,
  });
  res.render("admin/page/account/detail", {
    pageTitle: "Trang chi tiết",
    role: role,
    account: account,
  });
};
//[get]/admin/accounts/createPost
export const edit = async (req: Request, res: Response) => {
  const id = req.params.id;
  const account = await Account.findOne({
    _id: id,
    deleted: false,
  }).select("-password");
  const roles = await Role.find({
    deleted: false,
  });
  res.render("admin/page/account/edit", {
    pageTitle: "Trang chỉnh sửa",
    data: account,
    roles: roles,
  });
};
//[patch]/admin/accounts/createPost
export const editPatch = async (req: Request, res: Response) => {
  const id = req.params.id;

  const emailExit = await Account.findOne({
    _id: { $ne: id },
    email: req.body.email,

    deleted: false,
  });
  if (emailExit) {
    req.flash("error", "Email đã tồn tại");
    res.redirect("back");
  } else {
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }

    await Account.updateOne({ _id: id }, req.body);
    req.flash("success", "Chỉnh sửa thành ông");
  }
  res.redirect(`${systemConfig.prefixAdmin}/accounts`);
};
//[patch]/admin/accounts/delete/:id
export const deleted = async (req: Request, res: Response) => {
  await Account.updateOne({ _id: req.params.id }, { deleted: true });
  req.flash("success", "Xóa tài khoản thành công");
  res.redirect("back");
};
