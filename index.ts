import express, { Express, Request, Response } from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
import Topic from "./models/topic.model";

dotenv.config();
database.connect();
const app: Express = express();
const port: string = process.env.PORT;
app.set("views", "./views");
app.set("view engine", "pug");
app.get("/topic", async (req: Request, res: Response) => {
  const topics = await Topic.find({
    delete: false,
  });
  console.log(topics);
  res.render("client/page/topic/index");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
