"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_router_1 = require("./dashboard.router");
const config_1 = require("../../config/config");
const topic_router_1 = require("./topic.router");
const song_router_1 = require("./song.router");
const upload_router_1 = require("./upload.router");
const adminRouter = (app) => {
    const PATH_ADMIN = `${config_1.systemConfig.prefixAdmin}`;
    app.use(`${PATH_ADMIN}/dashboard`, dashboard_router_1.dashboardRouter);
    app.use(`${PATH_ADMIN}/topics`, topic_router_1.topicRouter);
    app.use(`${PATH_ADMIN}/songs`, song_router_1.songRouter);
    app.use(`${PATH_ADMIN}/upload`, upload_router_1.uploadRouter);
};
exports.default = adminRouter;
