import { Request, Response } from "express";
import { makeProcess } from "../../constants/helpers";
import db from "../../services/db";

export const getProducts = (req: Request, res: Response) => makeProcess({
  res,
  cb: async () => {
    const products = await db.product.findMany();
    return res.status(200).json(products);
  }
})