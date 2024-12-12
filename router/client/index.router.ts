import { Express } from "express";
import { topicRouter } from "./topic.router";
const clientRouter = (app: Express): void => {
  app.use("/topic", topicRouter);
};
export default clientRouter;
