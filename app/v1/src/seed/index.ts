import userSeed from "./user-seed";
import productSeed from "./product-seed";
import { makeProcess } from "../constants/helpers";
export default (() => makeProcess({
  cb: async () => {
    await userSeed();
    await productSeed();

    console.log('Seed successfuly');
  }
}))();