import { User } from "@prisma/client";
import { Request, Response } from "express";
import { IRequestContext } from "../../@core/types";
import { makeProcess } from "../../constants/helpers";
import db from "../../services/db";
import { ICreateOrder } from "./models/createOrder";

export const createOrder = (req: Request & IRequestContext, res: Response) => makeProcess({
  res,
  cb: async () => {
    const { uuid }: User = req.user!;
    const { productUuid, quantity }: ICreateOrder = req.body;
    const order = await db.order.create({
      data: {
        quantity: quantity,
        productUuid: productUuid,
        userUuid: uuid,
      },
      include: {
        product: true
      }
    });

    return res.status(200).json(order);
  }
});