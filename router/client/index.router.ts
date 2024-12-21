import { Express } from "express";
import { topicRouter } from "./topic.router";
import { dashboardRouter } from "./dashboard.router";
import { songRouter } from "./song.router";
import { favoriteRouter } from "./favorite-song.router";
import { searchRouter } from "./search.router";
import { settingGeneral } from "../../middleware/client/setting.middleware";
const clientRouter = (app: Express): void => {
  app.use(settingGeneral);
  app.use("/", topicRouter);
  app.use("/", dashboardRouter);
  app.use("/songs", songRouter);
  app.use("/favorite-songs", favoriteRouter);
  app.use("/search", searchRouter);
};
export default clientRouter;
