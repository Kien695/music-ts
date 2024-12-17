"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topic_router_1 = require("./topic.router");
const dashboard_router_1 = require("./dashboard.router");
const song_router_1 = require("./song.router");
const favorite_song_router_1 = require("./favorite-song.router");
const search_router_1 = require("./search.router");
const clientRouter = (app) => {
    app.use("/", topic_router_1.topicRouter);
    app.use("/", dashboard_router_1.dashboardRouter);
    app.use("/songs", song_router_1.songRouter);
    app.use("/favorite-songs", favorite_song_router_1.favoriteRouter);
    app.use("/search", search_router_1.searchRouter);
};
exports.default = clientRouter;
