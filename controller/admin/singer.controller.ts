import { Request, Response } from "express";
import Singer from "../../models/singer.model";
import { systemConfig } from "../../config/config";
//[get]/admin/singers
export const index = async (req: Request, res: Response) => {
  const singers = await Singer.find({
    deleted: false,
  });
  res.render("admin/page/singer/index", {
    pageTitle: "Quản lý ca sĩ",
    singers: singers,
  });
};
//[get]/admin/singers.detail/:id
export const detail = async (req: Request, res: Response) => {
  const id = req.params.id;
  const singer = await Singer.findOne({
    _id: id,

    deleted: false,
  });
  res.render("admin/page/singer/detail", {
    pageTitle: "Chi tiết ca sĩ",
    singer: singer,
  });
};
//[get]/admin/singers/edit/:id
export const edit = async (req: Request, res: Response) => {
  const id = req.params.id;
  const singer = await Singer.findOne({
    _id: id,

    deleted: false,
  });
  res.render("admin/page/singer/edit", {
    pageTitle: "Chỉnh sửa ca sĩ",
    singer: singer,
  });
};
//[patch]/admin/singers/edit/:id
export const editPatch = async (req: Request, res: Response) => {
  const id = req.params.id;

  await Singer.updateOne(
    {
      _id: id,
    },
    req.body
  );
  res.redirect("back");
};
//[get]/admin/singers/create
export const create = async (req: Request, res: Response) => {
  res.render("admin/page/singer/create", {
    pageTitle: "Thêm mới ca sĩ",
  });
};
//[post]/admin/singers/create
export const createPost = async (req: Request, res: Response) => {
  const data = new Singer(req.body);
  await data.save();
  res.redirect(`${systemConfig.prefixAdmin}/singers`);
};
