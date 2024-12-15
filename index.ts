import express, { Express } from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
import path from "path";
import clientRouter from "./router/client/index.router";
import adminRouter from "./router/admin/index.router";
import { systemConfig } from "./config/config";
dotenv.config();
database.connect();
const app: Express = express();
const port: string = process.env.PORT;
app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "pug");
//tinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
//end tinyMCE
// app local variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;
//clientRouter
clientRouter(app);
//adminRouter
adminRouter(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
