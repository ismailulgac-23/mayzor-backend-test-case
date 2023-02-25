import { Product, User } from "@prisma/client";
import { createUUID, makeProcess } from "../constants/helpers";
import db from "../services/db";

export const productsData: Product[] = [
  {
    uuid: createUUID(),
    image: "seed/tv.png",
    price: 3879.00,
    title: "ONVO OV42250 42 106 Ekran Uydu Alıcılı Full HD Smart LED TV"
  },
  {
    uuid: createUUID(),
    image: "seed/laptop.png",
    price: 19999.99,
    title: "Monster Abra A7 V13.2.3 Intel Core I5-11400h 16gb Ram 500gb Ssd 4gb Rtx3050ti Freedos 17.3 Fhd 144hz ABRA A7 V13.2.3"
  },
  {
    uuid: createUUID(),
    image: "seed/phone.png",
    price: 13990.00,
    title: "Huawei Nova 9 128 Gb 8 Gb Ram (nam-lx9) Akıllı Cep Telefonu TYC00724295333"
  },
];

export default () => makeProcess({
  cb: async () => {
    await db.product.createMany({
      data: productsData
    });
  }
});