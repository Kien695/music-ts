import { Express } from "express";
import { dashboardRouter } from "./dashboard.router";
import { systemConfig } from "../../config/config";
import { topicRouter } from "./topic.router";
import { songRouter } from "./song.router";
import { uploadRouter } from "./upload.router";
import { singerRouter } from "./singer.router";
import { roleRouter } from "./role.router";
import { accountRouter } from "./account.router";
import { settingRouter } from "./setting-general.router";
import { userRouter } from "./user.router";
import { authRouter } from "./auth.router";
import { authMiddleware } from "../../middleware/admin/auth.middleware";
const adminRouter = (app: Express): void => {
  const PATH_ADMIN = `${systemConfig.prefixAdmin}`;
  app.use(`${PATH_ADMIN}/dashboard`, authMiddleware, dashboardRouter);
  app.use(`${PATH_ADMIN}/topics`, authMiddleware, topicRouter);
  app.use(`${PATH_ADMIN}/songs`, authMiddleware, songRouter);
  app.use(`${PATH_ADMIN}/upload`, authMiddleware, uploadRouter);
  app.use(`${PATH_ADMIN}/singers`, authMiddleware, singerRouter);
  app.use(`${PATH_ADMIN}/roles`, authMiddleware, roleRouter);
  app.use(`${PATH_ADMIN}/accounts`, authMiddleware, accountRouter);
  app.use(`${PATH_ADMIN}/settings`, authMiddleware, settingRouter);
  app.use(`${PATH_ADMIN}/users`, authMiddleware, userRouter);
  app.use(`${PATH_ADMIN}/auth`, authRouter);
};
export default adminRouter;
