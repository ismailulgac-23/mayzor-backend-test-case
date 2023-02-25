import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { IRequestContext } from "../@core/types";
import { responseMessages } from "../constants/config";
import { verifyToken } from "../constants/helpers";

export default async (req: Request & IRequestContext, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      error: responseMessages.unauthorized
    });
  }
  const user: User | null = await verifyToken(authorization);
  if (user) {
    req.user = user;
    req.token = authorization;
    next();
  } else {
    req.user = undefined;
    req.token = undefined;
    return res.status(401).json({
      error: responseMessages.unauthorized
    });
  }
}