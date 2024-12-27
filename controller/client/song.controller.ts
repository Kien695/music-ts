import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import Favorite from "../../models/favorite-song.model";
//[get]/song/slug
export const list = async (req: Request, res: Response) => {
  const topic = await Topic.findOne({
    slug: req.params.slugTopic,
    status: "active",
    deleted: false,
  });
  const songs = await Song.find({
    topicId: topic.id,
    status: "active",
    deleted: false,
  }).select("avatar title slug singerId like");
  for (const song of songs) {
    const infoSinger = await Singer.findOne({
      _id: song.singerId,
      status: "active",
      deleted: false,
    });
    song["infoSinger"] = infoSinger;
  }
  res.render("client/page/songs/list", {
    pageTitle: topic.title,
    songs: songs,
  });
};
//[get]/song/detail/slug
export const detail = async (req: Request, res: Response) => {
  const slugSong: string = req.params.slugTopic;
  const song = await Song.findOne({
    slug: slugSong,
    status: "active",
    deleted: false,
  });
  const singer = await Singer.findOne({
    _id: song.singerId,
    deleted: false,
  }).select("fullName");
  const topic = await Topic.findOne({
    _id: song.topicId,
    deleted: false,
  }).select("title");
  const songFavorite = await Favorite.findOne({
    songId: song.id,
  });
  song["isFavoriteSong"] = songFavorite ? true : false;
  res.render("client/page/songs/detail", {
    pageTitle: "Chi tiết bài hát",
    song: song,
    singer: singer,
    topic: topic,
  });
};
//[patch]/songs/like/:typeLike/:id
export const like = async (req: Request, res: Response) => {
  const idSong: string = req.params.idSong;
  const typeLike: string = req.params.typeLike;
  const song = await Song.findOne({
    _id: idSong,
    deleted: false,
    status: "active",
  });
  const newLike: number = typeLike == "like" ? song.like + 1 : song.like - 1;
  await Song.updateOne(
    {
      _id: idSong,
    },
    {
      like: newLike,
    }
  );
  //like:["id_user1","id_user2",...]
  res.json({
    code: 200,
    message: "Thành công",
    like: newLike,
  });
};
//[patch]/songs/favorite/:typeFavorite/:id
export const favorite = async (req: Request, res: Response) => {
  const idSong: string = req.params.idSong;
  const userId = res.locals.user.id;
  const typeFavorite = req.params.typeFavorite;
  switch (typeFavorite) {
    case "favorite":
      const exitFavoriteSong = await Favorite.findOne({
        songId: idSong,
      });
      if (!exitFavoriteSong) {
        const record = new Favorite({
          userId: userId,
          songId: idSong,
        });
        await record.save();
      }
      break;
    case "unfavorite":
      await Favorite.deleteOne({
        songId: idSong,
      });
      break;
    default:
      break;
  }
  res.json({
    code: 200,
    message: "Thành công",
  });
};
//[patch]/songs/listen/:idSong
export const listen = async (req: Request, res: Response) => {
  const idSong: string = req.params.idSong;
  const song = await Song.findOne({
    _id: idSong,
  });
  const listen: number = song.listen + 1;
  await Song.updateOne(
    {
      _id: idSong,
    },
    {
      listen: listen,
    }
  );
  const songNew = await Song.findOne({
    _id: idSong,
  });
  res.json({
    code: 200,
    message: "Thành công",
    listen: songNew.listen,
  });
};
