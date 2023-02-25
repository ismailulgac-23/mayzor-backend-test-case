import { Request, Response } from "express";
import { IRequestContext } from "../../@core/types";
import { responseMessages } from "../../constants/config";
import { makeProcess } from "../../constants/helpers";
import db from "../../services/db";
import { IAddCommentToProduct } from "./models/addCommentToProduct";

export const addCommentToProduct = (req: Request & IRequestContext, res: Response) => makeProcess({
  res, cb: async () => {
    const { uuid: userUuid } = req.user!;
    const { productUuid, content }: IAddCommentToProduct = req.body;

    // aynı üründen birden fazla kez farklı miktarlara sahip sipariş verebileceğini
    // göz önünde bulundurarak herhangi bir tanesini çekmesi bizim için
    // yeterli olacaktır.

    const order = await db.order.findFirst({
      where: {
        productUuid: productUuid,
        userUuid: userUuid
      }
    });

    if (!order) {
      return res.status(400).json({
        error: responseMessages.orderNotAvailableForWriteComment
      })
    }

    // eğer sipariş vermiş ise ürüne yorum yapmış mı kontrolü yapıyorum.

    const isWroteComment = await db.productComment.findFirst({
      where: {
        productUuid: productUuid,
        userUuid: userUuid
      }
    });

    if (!isWroteComment) {
      // yorum ekleme

      const comment = await db.productComment.create({
        data: {
          content: content,
          productUuid: productUuid,
          userUuid: userUuid,
        }
      });

      return res.status(200).json(comment);

    }

    return res.status(400).json({
      error: responseMessages.firstTimeNotAvailableForWriteComment
    });
  }
});