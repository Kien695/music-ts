import { Express } from "express";
import { topicRouter } from "./topic.router";
import { dashboardRouter } from "./dashboard.router";
import { songRouter } from "./song.router";
const clientRouter = (app: Express): void => {
  app.use("/", topicRouter);
  app.use("/", dashboardRouter);
  app.use("/songs", songRouter);
};
export default clientRouter;
