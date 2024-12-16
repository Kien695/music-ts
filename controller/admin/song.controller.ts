import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
//[get]/admin/songs
export const song = async (req: Request, res: Response) => {
  const songs = await Song.find({
    deleted: false,
  });
  res.render("admin/page/song/index", {
    pageTitle: "Trang chủ",
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
