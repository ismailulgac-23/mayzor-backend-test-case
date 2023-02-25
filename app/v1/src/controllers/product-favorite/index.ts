import { User } from "@prisma/client";
import { Request, Response } from "express";
import { IRequestContext } from "../../@core/types";
import { responseMessages } from "../../constants/config";
import { makeProcess } from "../../constants/helpers";
import db from "../../services/db";
import { IAddToProductFavorite } from "./models/addProductToFavorite";

export const addProductToFavorite = (req: Request & IRequestContext, res: Response) => makeProcess({
  res,
  cb: async () => {
    const { uuid }: User = req.user!;
    const { productUuid }: IAddToProductFavorite = req.body;
    async function isAlreadyFavorited() {
      const favorited = await db.productFavorite.findFirst({
        where: {
          userUuid: uuid,
          productUuid: productUuid
        }
      });
      if (!favorited) {
        return false;
      }

      return true;
    }

    async function addToFavorite() {
      const favorite = await db.productFavorite.create({
        data: {
          userUuid: uuid,
          productUuid: productUuid
        },
        include: {
          product: true
        }
      });

      return favorite;
    }

    const alreadyFavorited = await isAlreadyFavorited();
    if (!alreadyFavorited) {
      const productFavorite = await addToFavorite();

      return res.status(200).json(productFavorite);
    } else {
      return res.status(400).json({
        error: responseMessages.isAlreadyProductInFavorite
      });
    }
  }
});

export const deleteFavoriteFromProduct = (req: Request & IRequestContext, res: Response) => makeProcess({
  res,
  cb: async () => {
    const { uuid: userUuid }: User = req.user!;
    const { productUuid } = req.params;
    if (!productUuid) {
      return res.status(400).json({
        error: responseMessages.missingInformationSent
      });
    }

    // burada direkt olarak uuid kolonundan silme işlemi yapacağım.
    // bunun için elimde favorimi bulmam için gerekli iki adet zaten  veri var (productUuid & userUuid)
    // bu bilgileri kullanarak önce ürüne ardından ürünün içinden sadece favori id sini alıyorum.

    async function findFavoriteUuidFromProduct() {
      const isFavorited = await db.productFavorite.findFirst({
        where: {
          productUuid: productUuid,
          userUuid: userUuid
        },
      });
      if (isFavorited) {
        return isFavorited.uuid;
      } else {
        throw new Error("Bu ürün favorilerinizde değil!")
      }
    }

    const favoriteUuid = await findFavoriteUuidFromProduct();

    await db.productFavorite.delete({
      where: {
        uuid: favoriteUuid
      }
    });

    return res.status(200).json({
      deleted: true
    });

  }
});