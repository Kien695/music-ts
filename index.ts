import express, { Express, Request, Response } from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
dotenv.config();
database.connect();
const app: Express = express();
const port: string = process.env.PORT;
app.set("views", "./views");
app.set("view engine", "pug");
app.get("/topic", (req: Request, res: Response) => {
  res.render("client/page/topic/index");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
