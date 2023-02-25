import { User } from "@prisma/client";
import { createUUID, makeProcess } from "../constants/helpers";
import db from "../services/db";

export const usersData: User[] = [
  {
    uuid: createUUID(),
    name: "ismail",
    surname: "ulgac",
    email: "ismailulgac17@gmail.com",
    phone: "05318706998"
  },
  {
    uuid: createUUID(),
    name: "John",
    surname: "Doe",
    email: "john@doe.com",
    phone: "0001112222"
  },
  {
    uuid: createUUID(),
    name: "Zac",
    surname: "Carl",
    email: "zac@carl.com",
    phone: "1112223333"
  },
];

export default () => makeProcess({
  cb: async () => {
    await db.user.createMany({
      data: usersData
    });
  }
});