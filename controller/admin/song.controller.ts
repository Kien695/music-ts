import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
import { systemConfig } from "../../config/config";
//[get]/admin/songs
export const song = async (req: Request, res: Response) => {
  const songs = await Song.find({
    deleted: false,
  });
  res.render("admin/page/song/index", {
    pageTitle: "Quản lý bài hát",
    songs: songs,
  });
};
//[get]/admin/songs/create
export const create = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    status: "active",
    deleted: false,
  }).select("title");
  const singers = await Singer.find({
    status: "active",
    deleted: false,
  }).select("fullName");
  res.render("admin/page/song/create", {
    pageTitle: "Thêm mới bài hát",
    topics: topics,
    singers: singers,
  });
};
//[get]/admin/songs/createPost
export const createPost = async (req: Request, res: Response) => {
  let avatar = "";
  let audio = "";
  if (req.body.avatar) {
    avatar = req.body.avatar[0];
  }
  if (req.body.audio) {
    audio = req.body.audio[0];
  }
  const dataSong = {
    title: req.body.title,
    topicId: req.body.topicId,
    singerId: req.body.singerId,
    description: req.body.description,
    status: req.body.status,
    avatar: avatar,
    audio: audio,
    lyrics: req.body.lyrics,
  };
  const song = new Song(dataSong);
  await song.save();

  res.redirect(`${systemConfig.prefixAdmin}/songs`);
};
//[get]/admin/edit/:id
export const edit = async (req: Request, res: Response) => {
  const id = req.params.id;
  const song = await Song.findOne({
    _id: id,
    deleted: false,
  });
  const topics = await Topic.find({
    deleted: false,
  }).select("title");
  const singers = await Singer.find({
    deleted: false,
  }).select("fullName");
  res.render("admin/page/song/edit", {
    pageTitle: "Trang chỉnh sửa",
    song: song,
    topics: topics,
    singers: singers,
  });
};
//[get]/admin/editPatch/:id
export const editPatch = async (req: Request, res: Response) => {
  const id = req.params.id;

  const dataSong = {
    title: req.body.title,
    topicId: req.body.topicId,
    singerId: req.body.singerId,
    description: req.body.description,
    status: req.body.status,
    lyrics: req.body.lyrics,
  };
  if (req.body.avatar) {
    dataSong["avatar"] = req.body.avatar[0];
  }
  if (req.body.audio) {
    dataSong["audio"] = req.body.audio[0];
  }
  await Song.updateOne({ _id: id }, dataSong);
  res.redirect("back");
};
//[get]/admin/songs/detail/:id
export const detail = async (req: Request, res: Response) => {
  const id = req.params.id;

  const song = await Song.findOne({
    _id: id,
    deleted: false,
  });
  const topic = await Topic.findOne({
    _id: song.topicId,
    deleted: false,
  });
  const singer = await Singer.findOne({
    _id: song.singerId,
    deleted: false,
  }).select("fullName");

  res.render("admin/page/song/detail", {
    pageTitle: "Trang chi tiết",
    song: song,
    singer: singer,
    topic: topic,
  });
};
//[patch]/admin/songs/delete/:id
export const deleted = async (req: Request, res: Response) => {
  const id = req.params.id;
  await Song.updateOne(
    {
      _id: id,
    },
    {
      deleted: true,
    }
  );
  res.redirect("back");
};
