import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import { systemConfig } from "../../config/config";
//[get]/admin/topics
export const index = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false,
  });
  res.render("admin/page/topic/index", {
    pageTitle: "Quản lý chủ đề",
    topics: topics,
  });
};
//[get]/admin/topics/create
export const create = async (req: Request, res: Response) => {
  res.render("admin/page/topic/create", {
    pageTitle: "Trang tạo mới",
  });
};
//[post]/admin/topics/create
export const createPost = async (req: Request, res: Response) => {
  const dataSong = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    avatar: req.body.avatar,
  };
  const topic = new Topic(dataSong);
  await topic.save();
  res.redirect(`${systemConfig.prefixAdmin}/topics`);
};
//[get]/admin/topics/detail/:id
export const detail = async (req: Request, res: Response) => {
  const id = req.params.id;
  const topic = await Topic.findOne({
    _id: id,
  });
  res.render("admin/page/topic/detail", {
    pageTitle: "Trang chi tiết",
    topic: topic,
  });
};
//[get]/admin/topics/edit/:id
export const edit = async (req: Request, res: Response) => {
  const id = req.params.id;
  const topic = await Topic.findOne({
    _id: id,
  });
  res.render("admin/page/topic/edit", {
    pageTitle: "Trang chỉnh sửa",
    topic: topic,
  });
};
//[patch]/admin/topics/editPatch/:id
export const editPatch = async (req: Request, res: Response) => {
  const id = req.params.id;
  const topic = await Topic.updateOne(
    {
      _id: id,
    },
    req.body
  );
  res.redirect("back");
};
//[Patch]/admin/topics/delete/:id
export const deleted = async (req: Request, res: Response) => {
  const id = req.params.id;
  await Topic.updateOne(
    {
      _id: id,
    },
    {
      deleted: true,
    }
  );
  res.redirect("back");
};
