import { Request, Response } from "express";
import Favorite from "../../models/favorite-song.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
//[get]/favorite-songs
export const index = async (req: Request, res: Response) => {
  const favoriteSong = await Favorite.find({
    userId: res.locals.user.id,
    deleted: false,
  });
  for (const item of favoriteSong) {
    const infoSong = await Song.findOne({
      _id: item.songId,
    });

    const infoSinger = await Singer.findOne({
      _id: infoSong.singerId,
    });

    item["infoSong"] = infoSong;
    item["infoSinger"] = infoSinger;
  }
  res.render("client/page/favorite-song/index", {
    pageTitle: "Bài hát yêu thích",
    favoriteSong: favoriteSong,
  });
};
