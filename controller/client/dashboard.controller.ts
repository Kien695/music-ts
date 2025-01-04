import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import Favorite from "../../models/favorite-song.model";
export const dashboard = async (req: Request, res: Response) => {
  const songLikes = await Song.find({
    deleted: false,
  })
    .sort({ like: -1 })
    .limit(3);
  for (const song of songLikes) {
    const infoSinger = await Singer.findOne({
      _id: song.singerId,
      deleted: false,
    });
    song["infoSinger"] = infoSinger;
  }
  const songListens = await Song.find({
    deleted: false,
  })
    .sort({ listen: -1 })
    .limit(3);
  for (const song of songListens) {
    const infoSinger = await Singer.findOne({
      _id: song.singerId,
      deleted: false,
    });
    song["infoSinger"] = infoSinger;
  }
  res.render("client/page/dashboard/index", {
    pageTitle: "Trang chủ",
    songLikes: songLikes,
    songListens: songListens,
  });
};
