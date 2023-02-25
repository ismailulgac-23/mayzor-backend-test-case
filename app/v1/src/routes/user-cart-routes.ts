import { Router } from "express";
import { userCartController } from "../controllers";
import { emptyDataMiddleware } from "../middlewares";
import authMiddleware from "../middlewares/auth-middleware";
const router = Router();
router.post("/cart/add-product", authMiddleware, emptyDataMiddleware, userCartController.addProductToCart);
router.delete("/cart/delete-product/:productUuid", authMiddleware, userCartController.deleteProductFromCart);
export default router;