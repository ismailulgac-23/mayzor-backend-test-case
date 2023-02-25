import { User } from "@prisma/client";
import { Request, Response } from "express";
import { IRequestContext } from "../../@core/types";
import { responseMessages } from "../../constants/config";
import { makeProcess } from "../../constants/helpers";
import db from "../../services/db";
import { IAddProductToCart } from "./models/addProductToCart";

export const addProductToCart = (req: Request & IRequestContext, res: Response) => makeProcess({
  res,
  cb: async () => {
    const { uuid }: User = req.user!;
    const { productUuid }: IAddProductToCart = req.body;
    const cartItem = await db.userCart.create({
      data: {
        userUuid: uuid,
        productUuid: productUuid,
      },
      include: {
        product: true
      }
    });

    return res.status(200).json(cartItem)
  }
});

export const deleteProductFromCart = (req: Request & IRequestContext, res: Response) => makeProcess({
  res,
  cb: async () => {
    const { uuid: userUuid } = req.user!;
    const { productUuid } = req.params;
    if (!productUuid) {
      return res.status(400).json({
        error: responseMessages.missingInformationSent
      });
    }

    const cartItem = await db.userCart.findFirst({
      where: {
        productUuid: productUuid,
        userUuid: userUuid
      },
      select: {
        uuid: true
      }
    });

    if (!cartItem) {
      return res.status(400).json({
        error: responseMessages.thisProductIsNotOnYourCart
      });
    }

    await db.userCart.delete({
      where: {
        uuid: cartItem.uuid
      }
    });

    return res.status(200).json({
      deleted: true
    });

  }
});