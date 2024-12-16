import { Request, Response } from "express";
import Song from "../../models/song.model";
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
