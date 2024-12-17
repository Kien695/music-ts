import { Request, Response } from "express";
//[get]/admin/upload
export const index = (req: Request, res: Response) => {
  console.log(req.body);
  res.json({
    location: req.body.file,
  });
};
