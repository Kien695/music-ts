"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_router_1 = require("./dashboard.router");
const config_1 = require("../../config/config");
const topic_router_1 = require("./topic.router");
const song_router_1 = require("./song.router");
const upload_router_1 = require("./upload.router");
const singer_router_1 = require("./singer.router");
const role_router_1 = require("./role.router");
const account_router_1 = require("./account.router");
const setting_general_router_1 = require("./setting-general.router");
const user_router_1 = require("./user.router");
const auth_router_1 = require("./auth.router");
const auth_middleware_1 = require("../../middleware/admin/auth.middleware");
const adminRouter = (app) => {
    const PATH_ADMIN = `${config_1.systemConfig.prefixAdmin}`;
    app.use(`${PATH_ADMIN}/dashboard`, auth_middleware_1.authMiddleware, dashboard_router_1.dashboardRouter);
    app.use(`${PATH_ADMIN}/topics`, auth_middleware_1.authMiddleware, topic_router_1.topicRouter);
    app.use(`${PATH_ADMIN}/songs`, auth_middleware_1.authMiddleware, song_router_1.songRouter);
    app.use(`${PATH_ADMIN}/upload`, auth_middleware_1.authMiddleware, upload_router_1.uploadRouter);
    app.use(`${PATH_ADMIN}/singers`, auth_middleware_1.authMiddleware, singer_router_1.singerRouter);
    app.use(`${PATH_ADMIN}/roles`, auth_middleware_1.authMiddleware, role_router_1.roleRouter);
    app.use(`${PATH_ADMIN}/accounts`, auth_middleware_1.authMiddleware, account_router_1.accountRouter);
    app.use(`${PATH_ADMIN}/settings`, auth_middleware_1.authMiddleware, setting_general_router_1.settingRouter);
    app.use(`${PATH_ADMIN}/users`, auth_middleware_1.authMiddleware, user_router_1.userRouter);
    app.use(`${PATH_ADMIN}/auth`, auth_router_1.authRouter);
};
exports.default = adminRouter;
