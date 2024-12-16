import { Express } from "express";
import { dashboardRouter } from "./dashboard.router";
import { systemConfig } from "../../config/config";
import { topicRouter } from "./topic.router";
const adminRouter = (app: Express): void => {
  const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;
  app.use(`${PATH_ADMIN}/dashboard`, dashboardRouter);
  app.use(`${PATH_ADMIN}/topics`, topicRouter);
};
export default adminRouter;
