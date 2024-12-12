import express, { Express } from "express";
import * as database from "./config/database";
import dotenv from "dotenv";

import clientRouter from "./router/client/index.router";
dotenv.config();
database.connect();
const app: Express = express();
const port: string = process.env.PORT;
app.set("views", "./views");
app.set("view engine", "pug");
//clientRouter
clientRouter(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
