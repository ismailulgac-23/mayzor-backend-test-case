import { NextFunction, Request, Response } from "express";
import { responseMessages } from "../constants/config";
import { parseBodyForEmptyObject } from "../constants/helpers";

export default (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  if (parseBodyForEmptyObject(body).length) {
    return res.status(400).json({
      error: responseMessages.required
    });
  }

  next();
}