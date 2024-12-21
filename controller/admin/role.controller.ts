import { Request, Response } from "express";
import Role from "../../models/role.model";
import { systemConfig } from "../../config/config";
//[get]/admin/roles
export const index = async (req: Request, res: Response) => {
  const roles = await Role.find({
    deleted: false,
  });
  res.render("admin/page/role/index", {
    pageTitle: "Nhóm quyền",
    roles: roles,
  });
};
//[get]/admin/roles/create
export const create = async (req: Request, res: Response) => {
  res.render("admin/page/role/create", {
    pageTitle: "Tạo nhóm quyền",
  });
};
//[post]/admin/roles/create
export const createPost = async (req: Request, res: Response) => {
  const role = new Role(req.body);
  await role.save();
  res.redirect(`${systemConfig.prefixAdmin}/roles`);
};
//[get]/admin/roles/detail/:id
export const detail = async (req: Request, res: Response) => {
  const role = await Role.findOne({
    deleted: false,
  });
  res.render("admin/page/role/detail", {
    pageTitle: "Chi tiết nhóm quyền",
    role: role,
  });
};
//[get]/admin/roles/edit/:id
export const edit = async (req: Request, res: Response) => {
  const role = await Role.findOne({
    _id: req.params.id,
    deleted: false,
  });

  res.render("admin/page/role/edit", {
    pageTitle: "Chỉnh sửa nhóm quyền",
    role: role,
  });
};
//[patch]/admin/roles/edit/:id
export const editPatch = async (req: Request, res: Response) => {
  await Role.updateOne(
    {
      _id: req.params.id,
    },
    req.body
  );
  res.redirect("back");
};
//[patch]/admin/roles/delete/:id
export const deleted = async (req: Request, res: Response) => {
  await Role.updateOne(
    {
      _id: req.params.id,
    },
    {
      deleted: true,
    }
  );
  res.redirect("back");
};
//[get]/admin/roles/permission
export const permission = async (req: Request, res: Response) => {
  const records = await Role.find({
    deleted: false,
  });
  res.render("admin/page/role/permission", {
    pageTitle: "Phân quyền",
    records: records,
  });
};
//[patch]/admin/roles/permission
export const permissionPatch = async (req: Request, res: Response) => {
  const permissions = JSON.parse(req.body.permission);
  for (const item of permissions) {
    await Role.updateOne({ _id: item.id }, { permission: item.permissions });
  }
  req.flash("success", "Cập nhật phân quyền thành công!");
  res.redirect("back");
};
