import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { convertToSlug } from "../../helpers/convertslyg";
//[get]/search/result
export const result = async (req: Request, res: Response) => {
  const keyword: string = `${req.query.keyword}`;
  let newSong = [];
  if (newSong) {
    const keywordRegex = await new RegExp(keyword, "i");
    //tạo slug không dấu, có dấu "- " ngăn cách
    const stringSlug = convertToSlug(keyword);
    const stringSlugRegex = await new RegExp(stringSlug, "i");

    const song = await Song.find({
      $or: [{ title: keywordRegex }, { slug: stringSlugRegex }],
    });
    for (const item of song) {
      const infoSinger = await Singer.findOne({
        _id: item.singerId,
      });
      item["infoSinger"] = infoSinger;
    }
    newSong = song;
  }
  res.render("client/page/search/result", {
    pageTitle: `Kết quả: ${keyword}`,
    keyword: keyword,
    songs: newSong,
  });
};
