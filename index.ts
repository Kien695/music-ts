import express, { Express } from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
import path from "path";
import clientRouter from "./router/client/index.router";
import adminRouter from "./router/admin/index.router";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import flash from "express-flash";
import session from "express-session";
import methodOverride from "method-override";
import { systemConfig } from "./config/config";
dotenv.config();
database.connect();
const app: Express = express();
const port: string = process.env.PORT;
app.use(express.static(`${__dirname}/public`));
//c1:sd body-parser
// app.use(bodyParser.urlencoded({ extended: false }));
//c2: không cần sửu dụng body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
//tinyMCE
//flash
app.use(cookieParser("KIENNE"));
app.use(
  session({
    secret: "your-secret-key", // Thêm secret
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }, // Thời gian hết hạn của cookie (60 giây)
  })
);
app.use(flash());
//end flash
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
