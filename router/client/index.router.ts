import { Express } from "express";
import { topicRouter } from "./topic.router";
import { dashboardRouter } from "./dashboard.router";
const clientRouter = (app: Express): void => {
  app.use("/", topicRouter);
  app.use("/", dashboardRouter);
};
export default clientRouter;
