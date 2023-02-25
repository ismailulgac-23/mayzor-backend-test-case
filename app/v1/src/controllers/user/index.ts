import { Request, Response } from "express";
import { createToken, makeProcess } from "../../constants/helpers";
import db from "../../services/db";
import { IRequestContext } from "../../@core/types";
import { responseMessages } from "../../constants/config";
import { ILoginBody } from "./models/login";
import { IRegisterBody } from "./models/register";

export const login = (req: Request, res: Response) => makeProcess({
  res,
  cb: async () => {
    const { emailOrPhone }: ILoginBody = req.body;
    const user = await db.user.findFirst({
      where: {
        OR: [
          {
            email: emailOrPhone
          },
          {
            phone: emailOrPhone
          }
        ]
      }
    });

    if (!user) {
      return res.status(400).json({
        error: responseMessages.wrongCredential
      });
    }

    const token = createToken(user);

    return res.status(200).json({
      user,
      token
    });
  }
})
export const register = (req: Request, res: Response) => makeProcess({
  res, cb: async () => {
    const { email, name, surname, phone }: IRegisterBody = req.body;
    const user = await db.user.create({
      data: {
        email,
        name,
        phone,
        surname,
      }
    });

    const token = createToken(user);

    return res.status(200).json({
      user,
      token
    });
  }
});
// token doğrulama ve bulunursa user & token dönme
export const onUser = (req: Request & IRequestContext, res: Response) => makeProcess({
  res,
  cb: async () => {
    if (!req.user || !req.token) {
      return res.status(401).json({
        error: responseMessages.unauthorized
      });
    }

    return res.status(200).json({
      user: req.user,
      token: req.token
    });
  }
});