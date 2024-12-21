import { Request, Response } from "express";
import Singer from "../../models/singer.model";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
//[get]/admin/dashboard
export const dashboard = async (req: Request, res: Response) => {
  const statistic = {
    singer: { total: 0, active: 0, inactive: 0 },
    song: { total: 0, active: 0, inactive: 0 },
    topic: { total: 0, active: 0, inactive: 0 },
  };
  //singer
  statistic.singer.total = await Singer.countDocuments({
    deleted: false,
  });
  statistic.singer.active = await Singer.countDocuments({
    deleted: false,
    status: "active",
  });
  statistic.singer.inactive = await Singer.countDocuments({
    deleted: false,
    status: "inactive",
  });
  //end singer
  //song
  statistic.song.total = await Song.countDocuments({
    deleted: false,
  });
  statistic.song.active = await Song.countDocuments({
    deleted: false,
    status: "active",
  });
  statistic.song.inactive = await Song.countDocuments({
    deleted: false,
    status: "inactive",
  });
  //end song
  //topic
  statistic.topic.total = await Topic.countDocuments({
    deleted: false,
  });
  statistic.topic.active = await Topic.countDocuments({
    deleted: false,
    status: "active",
  });
  statistic.topic.inactive = await Topic.countDocuments({
    deleted: false,
    status: "inactive",
  });
  //end topic
  res.render("admin/page/dashboard/index", {
    pageTitle: "Trang chủ",
    statistic: statistic,
  });
};
