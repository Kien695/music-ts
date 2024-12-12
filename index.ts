import express, { Express, Request, Response } from "express";
const app: Express = express();
const port: number = 3000;
app.set("views", "./views");
app.set("view engine", "pug");
app.get("/topic", (req: Request, res: Response) => {
  res.render("client/page/topic/index");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
