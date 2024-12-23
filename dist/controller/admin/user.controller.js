"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const user = (req, res) => {
    res.render("admin/page/user/index", {
        pageTitle: "Danh sách tài khoản user",
    });
};
exports.user = user;
