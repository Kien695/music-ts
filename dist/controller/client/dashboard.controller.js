"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboard = void 0;
const dashboard = (req, res) => {
    res.render("client/page/dashboard/index", {
        pageTitle: "Trang chủ",
    });
};
exports.dashboard = dashboard;
